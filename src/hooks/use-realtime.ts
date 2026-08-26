import { useEffect, useRef } from 'react'
import type { RecordModel, RecordSubscription } from 'pocketbase'

import pb from '@/lib/pocketbase/client'

/**
 * Hook for real-time subscriptions to a PocketBase collection.
 * ALWAYS use this hook instead of subscribing inline.
 * Uses the per-listener UnsubscribeFunc so multiple components
 * can safely subscribe to the same collection without conflicts.
 *
 * Generic over the record type: pass your collection's interface as
 * `useRealtime<MyRecord>(...)` to get a typed subscription payload
 * instead of `unknown`.
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

    let unsubscribeFn: (() => Promise<void>) | undefined
    let cancelled = false
    let retryTimeoutId: ReturnType<typeof setTimeout> | undefined
    let retryDelay = 1000 // starts at 1s, doubles up to 30s

    const connect = () => {
      if (cancelled) return

      pb.collection<TRecord>(collectionName)
        .subscribe('*', (e) => {
          callbackRef.current(e)
        })
        .then((fn) => {
          if (cancelled) {
            fn().catch(() => {})
          } else {
            unsubscribeFn = fn
            retryDelay = 1000 // reset delay on successful subscribe
          }
        })
        .catch((err) => {
          if (cancelled) return
          console.warn(
            `[useRealtime] Error subscribing to "${collectionName}", retrying in ${retryDelay}ms:`,
            err,
          )
          retryTimeoutId = setTimeout(() => {
            if (!cancelled) {
              retryDelay = Math.min(retryDelay * 2, 30000)
              connect()
            }
          }, retryDelay)
        })
    }

    connect()

    return () => {
      cancelled = true
      if (retryTimeoutId) {
        clearTimeout(retryTimeoutId)
      }
      if (unsubscribeFn) {
        unsubscribeFn().catch(() => {})
      }
    }
  }, [collectionName, enabled])
}

export default useRealtime
