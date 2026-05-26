import { useState } from 'react'
import pb from '@/lib/pocketbase/client'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { KeyRound } from 'lucide-react'

export function ResetPasswordModal({ targetUser }: { targetUser: any }) {
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleReset = async () => {
    if (password.length < 8) return toast.error('A senha deve ter no mínimo 8 caracteres')
    setLoading(true)
    try {
      await pb.send(`/backend/v1/users/${targetUser.id}/reset-password`, {
        method: 'POST',
        body: JSON.stringify({ password }),
      })
      toast.success(`Senha de ${targetUser.name || 'usuário'} alterada!`)
      setOpen(false)
      setPassword('')
    } catch (err: any) {
      toast.error(err.message || 'Erro ao redefinir senha')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Resetar Senha">
          <KeyRound className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resetar Senha - {targetUser.name || targetUser.email}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Nova Senha</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimo 8 caracteres"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleReset} disabled={loading}>
            {loading ? 'Salvando...' : 'Confirmar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
