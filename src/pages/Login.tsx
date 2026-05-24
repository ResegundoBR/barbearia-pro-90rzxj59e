import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Scissors } from 'lucide-react'
import { toast } from 'sonner'
import pb from '@/lib/pocketbase/client'

export default function Login() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [orgName, setOrgName] = useState('La Barberiá')

  useEffect(() => {
    pb.send('/backend/v1/public-org', { method: 'GET' })
      .then((res) => {
        if (res.name) setOrgName(res.name)
      })
      .catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await signIn(email, password)
    if (error) {
      toast.error('Credenciais inválidas. Verifique e tente novamente.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-8 text-center animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4 shadow-lg">
          <Scissors className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{orgName}</h1>
        <p className="text-muted-foreground mt-2 font-medium">Acesso ao sistema de gestão</p>
      </div>

      <Card
        className="w-full max-w-md shadow-xl border-t-4 border-t-primary animate-fade-in-up"
        style={{ animationDelay: '100ms' }}
      >
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Insira suas credenciais para acessar a plataforma.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading ? 'Autenticando...' : 'Acessar Plataforma'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
