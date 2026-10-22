import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertCircle, RefreshCcw, Home, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
  errorTime?: string
  errorRoute?: string
  copied?: boolean
  showDetails?: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    copied: false,
    showDetails: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    const route = typeof window !== 'undefined' ? window.location.pathname : 'desconhecida'
    const time = new Date().toLocaleString('pt-BR')
    return {
      hasError: true,
      error,
      errorRoute: route,
      errorTime: time,
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  private handleReload = () => {
    window.location.reload()
  }

  private handleCopy = () => {
    const { error, errorInfo, errorTime, errorRoute } = this.state
    const text = [
      '=== DIAGNÓSTICO DO ERRO (La Barberiá) ===',
      `Horário: ${errorTime || new Date().toLocaleString('pt-BR')}`,
      `Rota: ${errorRoute || (typeof window !== 'undefined' ? window.location.pathname : 'desconhecida')}`,
      `Mensagem: ${error?.name || 'Error'}: ${error?.message || 'Erro desconhecido'}`,
      '',
      '--- Stack trace do erro ---',
      error?.stack || 'Nenhuma stack trace disponível',
      '',
      '--- Component Stack (React) ---',
      errorInfo?.componentStack || 'Nenhuma component stack disponível',
      '==========================================',
    ].join('\n')

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          this.setState({ copied: true })
          setTimeout(() => this.setState({ copied: false }), 2000)
        })
        .catch(() => {
          this.fallbackCopyText(text)
        })
    } else {
      this.fallbackCopyText(text)
    }
  }

  private fallbackCopyText = (text: string) => {
    try {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      this.setState({ copied: true })
      setTimeout(() => this.setState({ copied: false }), 2000)
    } catch {
      /* ignore copy error */
    }
  }

  public render() {
    if (this.state.hasError) {
      const { error, errorInfo, errorTime, errorRoute, copied, showDetails } = this.state
      return (
        <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-background p-4 sm:p-6 text-center">
          <div className="rounded-full bg-destructive/10 p-4 mb-4">
            <AlertCircle className="size-12 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Ops, algo deu errado.</h2>
          <p className="text-muted-foreground mb-6 max-w-md text-sm sm:text-base">
            Ocorreu um erro inesperado. Você pode recarregar a página para continuar.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none justify-center mb-6">
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

          <div className="w-full max-w-lg text-left bg-muted/40 border border-border/80 rounded-lg p-3 sm:p-4 text-xs">
            <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-border/50">
              <span className="font-semibold text-foreground">Diagnóstico Técnico</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={this.handleCopy}
                  className="h-7 px-2 text-xs flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copiar detalhes</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => this.setState({ showDetails: !showDetails })}
                  className="h-7 px-2 text-xs flex items-center gap-1"
                >
                  {showDetails ? (
                    <>
                      <ChevronUp className="size-3.5" />
                      <span>Ocultar</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="size-3.5" />
                      <span>Detalhes</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-1 text-muted-foreground break-words">
              <div>
                <strong className="text-foreground">Rota:</strong>{' '}
                <span className="font-mono text-[11px]">{errorRoute || 'N/A'}</span>
              </div>
              <div>
                <strong className="text-foreground">Horário:</strong>{' '}
                <span>{errorTime || 'N/A'}</span>
              </div>
              <div>
                <strong className="text-foreground">Erro:</strong>{' '}
                <span className="text-destructive font-mono text-[11px]">
                  {error?.name || 'Error'}: {error?.message || 'Erro desconhecido'}
                </span>
              </div>
            </div>

            {showDetails && (
              <div className="mt-3 pt-3 border-t border-border/50 space-y-2">
                {error?.stack && (
                  <div>
                    <div className="font-semibold text-foreground mb-1">Stack:</div>
                    <pre className="p-2 bg-background/80 rounded text-[10px] font-mono overflow-x-auto max-h-40 whitespace-pre-wrap break-all text-muted-foreground">
                      {error.stack}
                    </pre>
                  </div>
                )}
                {errorInfo?.componentStack && (
                  <div>
                    <div className="font-semibold text-foreground mb-1">Component Stack:</div>
                    <pre className="p-2 bg-background/80 rounded text-[10px] font-mono overflow-x-auto max-h-40 whitespace-pre-wrap break-all text-muted-foreground">
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
