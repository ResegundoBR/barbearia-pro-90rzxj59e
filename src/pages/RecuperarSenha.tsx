import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, KeyRound, CheckCircle2 } from 'lucide-react'

export default function RecuperarSenha() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { resetPassword } = useAuth()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!email.includes('@') || !email.includes('.')) {
      setError('Por favor, insira um e-mail válido.')
      setIsLoading(false)
      return
    }

    const res = await resetPassword(email)
    setIsLoading(false)

    if (res.error) {
      setError(
        'Ocorreu um erro ao tentar enviar o link de recuperação. Tente novamente mais tarde.',
      )
    } else {
      setIsSuccess(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-amber-100/50">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="mx-auto bg-amber-100 text-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <KeyRound className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold">Recuperar Senha</CardTitle>
          <CardDescription>
            {isSuccess
              ? 'Verifique sua caixa de entrada'
              : 'Informe seu e-mail para receber um link de recuperação'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="p-4 bg-green-50 text-green-700 rounded-lg flex flex-col items-center gap-2 border border-green-100">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <p>
                  Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha em
                  instantes.
                </p>
              </div>
              <Button asChild className="w-full bg-[#d99426] hover:bg-[#c48421] text-white">
                <Link to="/">Voltar para o login</Link>
              </Button>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-3 text-sm border border-red-100 animate-fade-in">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}
              <form onSubmit={handleReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemplo@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="focus-visible:ring-amber-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#d99426] hover:bg-[#c48421] text-white font-medium py-2.5 mt-4 transition-colors"
                  disabled={isLoading || !email}
                >
                  {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
                </Button>

                <div className="text-center mt-6">
                  <Link to="/" className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                    Voltar para o login
                  </Link>
                </div>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
