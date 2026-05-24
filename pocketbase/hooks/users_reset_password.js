routerAdd(
  'POST',
  '/backend/v1/users/{id}/reset-password',
  (e) => {
    const id = e.request.pathValue('id')
    const auth = e.auth
    if (!auth) {
      throw new ForbiddenError('Acesso não autenticado')
    }

    const accessLevel = auth.getString('access_level')
    const isAdminOrSocio = accessLevel === 'Admin' || accessLevel === 'Socio'
    if (!isAdminOrSocio) {
      throw new ForbiddenError('Acesso negado. Apenas Admin e Sócio podem resetar senhas.')
    }

    const body = e.requestInfo().body || {}
    const newPassword = body.password
    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
      const { ValidationError } = require('pocketbase')
      throw new BadRequestError('Senha inválida', {
        password: new ValidationError(
          'invalid_password',
          'A senha deve ter no mínimo 8 caracteres.',
        ),
      })
    }

    const targetUser = $app.findRecordById('users', id)
    const targetOrgId = targetUser.getString('organization_id')
    const authOrgId = auth.getString('organization_id')

    if (targetOrgId !== authOrgId && auth.getString('email') !== 'alissonmayer7@gmail.com') {
      throw new ForbiddenError('O usuário não pertence a sua organização.')
    }

    targetUser.setPassword(newPassword)
    $app.save(targetUser)

    return e.json(200, { success: true })
  },
  $apis.requireAuth(),
)
