const {
  [process.env.NODE_ENV]: { secret },
} = require('../config/env')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  hashPassword: password => bcrypt.hashSync(password),
  comparePassword: (password, userPassword) =>
    bcrypt.compareSync(password, userPassword),

  generateToken: user => {
    const token = jwt.sign(user, secret)
    console.log(token)
    return token
  },

  verifyToken: user => {
    const token = jwt.verify(token, 'wrong-secret')
    console.log('Wrong Token')
  },

  generateRandString: () =>
    Math.random()
      .toString(36)
      .substring(2, 15),
}
