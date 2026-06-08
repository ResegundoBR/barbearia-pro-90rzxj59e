import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertCircle, RefreshCcw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-background p-4 text-center">
          <AlertCircle className="size-16 text-destructive mb-6" />
          <h2 className="text-2xl font-bold mb-2">Ops! Algo deu errado.</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Ocorreu um erro inesperado ao carregar esta página. Nossa equipe foi notificada e
            estamos trabalhando para resolver isso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              onClick={() => (window.location.href = '/dashboard')}
              className="w-full sm:w-auto"
            >
              <Home className="mr-2 size-4" />
              Retornar ao Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={() => this.setState({ hasError: false })}
              className="w-full sm:w-auto"
            >
              <RefreshCcw className="mr-2 size-4" />
              Tentar Novamente
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
