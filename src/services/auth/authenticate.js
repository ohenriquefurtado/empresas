const { authenticate } = require('../../services/auth')

module.exports = {
  signin: async (req, res) => {
    try {
      const { email, password } = req.body
      const auth = await authenticate(email, password)
      res.status(200).json({
        auth,
      })
    } catch (error) {
      console.error(error)
      res.status(error.status || 500).json({
        name: error.name,
        message: error.message,
      })
    }
  },
}
