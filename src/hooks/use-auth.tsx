import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import pb from '@/lib/pocketbase/client'

interface AuthContextType {
  user: any
  isAuthenticated: boolean
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  resetPassword: (email: string) => Promise<{ error: any }>
  signOut: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(pb.authStore.isValid ? pb.authStore.record : null)

  const checkAuthValid = (record: any) => {
    if (!record) return false
    const isSuperAdmin =
      record.email === 'reginaldo.segundo@planagroup.com.br' ||
      record.email === 'alissonmayer7@gmail.com'
    return !!record.organization_id || isSuperAdmin
  }

  const [isAuthenticated, setIsAuthenticated] = useState(
    pb.authStore.isValid && checkAuthValid(pb.authStore.record),
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((_token, record) => {
      setUser(pb.authStore.isValid ? record : null)
      setIsAuthenticated(pb.authStore.isValid && checkAuthValid(record))
    })

    if (pb.authStore.isValid) {
      pb.collection('users')
        .authRefresh()
        .then((res) => {
          if (!checkAuthValid(res.record)) {
            pb.authStore.clear()
            setUser(null)
            setIsAuthenticated(false)
          }
        })
        .catch(() => {
          pb.authStore.clear()
          setUser(null)
          setIsAuthenticated(false)
        })
        .finally(() => setLoading(false))
    } else {
      if (pb.authStore.record) pb.authStore.clear()
      setLoading(false)
    }

    return () => {
      unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    try {
      await pb.collection('users').create({ email, password, passwordConfirm: password })
      await pb.collection('users').authWithPassword(email, password)
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      await pb.collection('users').authWithPassword(email, password)
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      await pb.collection('users').requestPasswordReset(email)
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signOut = () => {
    pb.authStore.clear()
    window.location.href = '/' // Force full reload to clear all React state completely
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signUp, signIn, resetPassword, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
