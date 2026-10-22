import { useEffect, useRef } from 'react'
import type { RecordModel, RecordSubscription } from 'pocketbase'

import pb from '@/lib/pocketbase/client'

// Set of active re-subscribe triggers across all mounted hooks
const activeReconnections = new Set<() => void>()

let isResetting = false
let lastResetTime = 0

/**
 * Checks whether an error represents a stale, rejected or dead realtime connection.
 */
function isRealtimeRejection(err: unknown): boolean {
  if (!err) return false
  const status = (err as any)?.status || (err as any)?.statusCode
  const message = String((err as any)?.message || '')
  const url = String((err as any)?.url || '')

  return (
    status === 404 ||
    message.includes('Missing or invalid client id') ||
    message.includes('Failed to establish realtime connection') ||
    message.includes('EventSource') ||
    url.includes('/api/realtime')
  )
}

/**
 * Destroys completely the current SSE client and subscriptions in PocketBase SDK
 * so that any subsequent subscribe creates a brand new connection with a new client ID.
 */
export function resetRealtimeClient() {
  const now = Date.now()
  if (isResetting || now - lastResetTime < 300) {
    return
  }
  isResetting = true
  lastResetTime = now

  try {
    const rt = (pb as any).realtime
    if (rt) {
      if (typeof rt.disconnect === 'function') {
        rt.disconnect()
      } else {
        if (rt.eventSource && typeof rt.eventSource.close === 'function') {
          rt.eventSource.close()
        }
        rt.eventSource = null
        rt.clientId = ''
        rt.lastSentSubscriptions = []
      }
    }
  } catch {
    // Silently ignore any disconnect errors
  } finally {
    isResetting = false
    // Notify all active hooks to re-establish clean subscriptions with the new client
    activeReconnections.forEach((reconnect) => {
      try {
        reconnect()
      } catch {
        /* ignore */
      }
    })
  }
}

// Global safety net: prevent any unhandled rejection from realtime requests
// from bubbling up to the window and triggering React ErrorBoundary
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event?.reason
    if (isRealtimeRejection(reason)) {
      event.preventDefault()
      console.warn(
        '[useRealtime] Prevented unhandled realtime rejection:',
        reason?.message || reason,
      )
      resetRealtimeClient()
    }
  })
}

/**
 * Hook for real-time subscriptions to a PocketBase collection.
 * ALWAYS use this hook instead of subscribing inline.
 *
 * Resilient to mobile network drops, background app sleep and 404 client id expirations.
 * Realtime is strictly optional: failures will never crash the page or propagate to ErrorBoundary.
 */
export function useRealtime<TRecord extends RecordModel = RecordModel>(
  collectionName: string,
  callback: (data: RecordSubscription<TRecord>) => void,
  enabled: boolean = true,
) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    if (!enabled) return

    let cancelled = false
    let unsubscribeFn: (() => Promise<void>) | undefined
    let retryTimeout: ReturnType<typeof setTimeout> | undefined
    let retryAttempt = 0
    let isConnecting = false

    const cleanupCurrentSub = () => {
      if (unsubscribeFn) {
        const fn = unsubscribeFn
        unsubscribeFn = undefined
        try {
          fn().catch(() => {})
        } catch {
          // Ignore
        }
      }
    }

    const safeCallback = (e: RecordSubscription<TRecord>) => {
      try {
        const result: unknown = callbackRef.current(e)
        // If callback is async, catch and swallow any rejected promise
        if (result && typeof (result as Promise<unknown>).catch === 'function') {
          ;(result as Promise<unknown>).catch((err) => {
            console.warn(`[useRealtime] Non-fatal callback error for ${collectionName}:`, err)
          })
        }
      } catch (err) {
        console.warn(`[useRealtime] Non-fatal callback error for ${collectionName}:`, err)
      }
    }

    const scheduleReconnect = (isStaleError: boolean) => {
      if (cancelled) return

      if (isStaleError) {
        // Destroy old expired client completely
        resetRealtimeClient()
      }

      cleanupCurrentSub()

      // Exponential backoff: 1s, 2s, 4s, 8s, 16s, max 30s + jitter
      const baseDelay = Math.min(Math.pow(2, retryAttempt) * 1000, 30000)
      const jitter = Math.random() * 800
      const delay = baseDelay + jitter
      retryAttempt = Math.min(retryAttempt + 1, 6)

      if (retryTimeout) clearTimeout(retryTimeout)
      retryTimeout = setTimeout(() => {
        if (!cancelled && enabled) {
          connect()
        }
      }, delay)
    }

    const connect = () => {
      if (cancelled || !enabled || isConnecting) return
      isConnecting = true

      cleanupCurrentSub()

      try {
        pb.collection<TRecord>(collectionName)
          .subscribe('*', safeCallback)
          .then((fn) => {
            isConnecting = false
            if (cancelled) {
              fn().catch(() => {})
            } else {
              unsubscribeFn = fn
              retryAttempt = 0 // Reset backoff on success
            }
          })
          .catch((err) => {
            isConnecting = false
            console.warn(
              `[useRealtime] Realtime subscription failed for ${collectionName} (non-fatal):`,
              err?.message || err,
            )
            scheduleReconnect(isRealtimeRejection(err))
          })
      } catch (err) {
        isConnecting = false
        console.warn(
          `[useRealtime] Synchronous subscription error for ${collectionName} (non-fatal):`,
          err,
        )
        scheduleReconnect(isRealtimeRejection(err))
      }
    }

    // Trigger immediate reconnect when device wakes up or network recovers
    const handleVisibilityOrOnline = () => {
      if (cancelled || !enabled) return
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return

      // Reset backoff and reconnect
      retryAttempt = 0
      if (retryTimeout) clearTimeout(retryTimeout)
      connect()
    }

    const triggerReconnection = () => {
      if (cancelled || !enabled) return
      retryAttempt = 0
      if (retryTimeout) clearTimeout(retryTimeout)
      connect()
    }

    activeReconnections.add(triggerReconnection)

    if (typeof window !== 'undefined') {
      window.addEventListener('online', handleVisibilityOrOnline)
      document.addEventListener('visibilitychange', handleVisibilityOrOnline)
    }

    // Initial connection
    connect()

    return () => {
      cancelled = true
      activeReconnections.delete(triggerReconnection)

      if (retryTimeout) {
        clearTimeout(retryTimeout)
      }

      if (typeof window !== 'undefined') {
        window.removeEventListener('online', handleVisibilityOrOnline)
        document.removeEventListener('visibilitychange', handleVisibilityOrOnline)
      }

      cleanupCurrentSub()
    }
  }, [collectionName, enabled])
}

export default useRealtime
