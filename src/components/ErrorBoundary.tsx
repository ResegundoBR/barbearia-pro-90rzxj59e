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

  private handleReload = () => {
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-background p-6 text-center">
          <div className="rounded-full bg-destructive/10 p-4 mb-4">
            <AlertCircle className="size-12 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Ops, algo deu errado.</h2>
          <p className="text-muted-foreground mb-6 max-w-md text-sm sm:text-base">
            Ocorreu um erro inesperado. Você pode recarregar a página para continuar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none justify-center">
            <Button
              onClick={this.handleReload}
              size="lg"
              className="w-full sm:w-auto font-bold min-h-[48px]"
            >
              <RefreshCcw className="mr-2 size-5" />
              Recarregar
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                this.setState({ hasError: false })
                window.location.href = '/dashboard'
              }}
              className="w-full sm:w-auto min-h-[48px]"
            >
              <Home className="mr-2 size-5" />
              Ir para o Início
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
