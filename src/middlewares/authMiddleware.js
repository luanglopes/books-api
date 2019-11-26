const User = require('../models/User')
const UserRepository = require('../repositories/UserRepository')
const AuthService = require('../services/AuthService')
const authHelpers = require('../helpers/auth')

const authService = new AuthService(new UserRepository(User))

module.exports = async (req, _res, next) => {
  try {
    const token = authHelpers.getTokenFromHeaders({ headers: req.headers })

    const authData = await authService.verifyToken({ token })

    req.user = authData.user

    next()
  } catch (error) {
    next(error)
  }
}
