const { User } = require('../models')

const { encryptor } = require('../helpers')

module.exports = {
  authenticate: async (req, res) => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(403).json({ error: 'Email ou senha faltando' })
      }

      const user = await User.findOne({ where: { email } })
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' })
      }

      if (!encryptor.comparePassword(password, user.password)) {
        return res.status(401).json({ error: 'Senha inválida' })
      }

      const token = encryptor.generateToken({
        id: user.id,
        email: user.email,
      })

      return res.json({
        email,
        token,
      })
    } catch (error) {
      throw error
    }
  },
}
