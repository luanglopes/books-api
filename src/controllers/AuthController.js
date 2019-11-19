'use strict'
const autoBind = require('auto-bind')

class AuthController {
  /**
   * @param {import('../services/AuthService')} authService
   */
  constructor (authService) {
    this.authService = authService

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

module.exports = AuthController
