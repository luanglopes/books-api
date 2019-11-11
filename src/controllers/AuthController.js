const autoBind = require('auto-bind')

const User = require('../models/User')
const UserRepository = require('../repositories/UserRepository')
const AuthService = require('../services/AuthService')

class BookController {
  constructor () {
    this.authService = new AuthService(UserRepository, User, process.env.SECRET)

    autoBind(this)
  }

  async authenticate (req, res, next) {
    const { email, password } = req.body

    try {
      const authData = await this.authService.authenticate({ email, password })

      res.json({ token: authData.token, user: authData.user })
    } catch (error) {
      next(error)
    }
  }

  async verifyToken (req, res, next) {
    const { token } = req.body

    try {
      const authData = await this.authService.verifyToken({ token })

      res.json({ token, user: authData.user })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = BookController
