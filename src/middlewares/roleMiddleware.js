const createError = require('http-errors')

module.exports = (...authorizedRoles) => async (req, _res, next) => {
  try {
    const { user } = req

    if (!user) {
      throw new createError.Unauthorized('Not Authenticated')
    }

    const isAuthorized = authorizedRoles.some(role => user.role === role)

    if (!isAuthorized) {
      throw new createError.Forbidden('You are not authorized to access this route')
    }

    next()
  } catch (error) {
    next(error)
  }
}
