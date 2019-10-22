const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
  create: async (req, res) => {
    const { password } = req.body
    let { email } = req.body

    if (email) {
      email = email.replace(/\s+/g, '').toLowerCase()
    }

    const userExist = await User.findOne({ where: { email } })
    if (userExist) {
      return res.status(400).json({ error: 'Usuário já existe' })
    }

    try {
      var hashedPassword = bcrypt.hashSync(password, 8)
      let user = await User.create({
        email,
        password: hashedPassword,
      })
      return res.json(user)
    } catch (error) {
      console.log(error)
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params

      await User.destroy({ where: { id } })
      return res.json({})
    } catch (e) {
      console.log(e)
    }
  },
  update: async (req, res) => {
    try {
      const user_id = await req.params.id
      const { email, password } = req.body
      User.update(
        {
          email: email,
          password: password,
        },
        {
          where: {
            id: user_id,
          },
        }
      )
      return res.json({})
    } catch (e) {
      console.log(e)
    }
  },

  getAll: async (req, res) => {
    try {
      const user = await User.findAll()
      return res.json(user)
    } catch (e) {
      console.log(e)
    }
  },
  get: async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req.params.id } })

      if (user) return res.json(user)
      else return res.json({ error: 'Usuário não encontrado!' })
    } catch (e) {
      console.log(e)
    }
  },
  updateCurrent: async (req, res) => {
    try {
      let { email, password } = req.body
      var hashedPassword = bcrypt.hashSync(password, 8)
      const user = await User.update(
        {
          email: email,
          password: hashedPassword,
        },
        {
          where: {
            id: req.session.user.id,
          },
        }
      )
      return res.json({ email, password })
    } catch (e) {
      console.log(e)
    }
  },
}
