const createError = require('http-errors')

const isProduction = process.env.NODE_ENV === 'production'

class ErrorHandler {
  static format (error) {
    return error.name === 'ValidationError'
      ? createError(new createError.BadRequest(), { fields: error.data })
      : error
  }

  static notFoundHandler (_re, _res, next) {
    next(new createError.NotFound())
  }

  static handle (error, _req, res, _next) {
    const formattedError = ErrorHandler.format(error)

    const statusCode = formattedError.status || 500
    let errorMessage = formattedError.message || 'Internal server error'

    if (statusCode === 500) {
      if (isProduction) {
        // Don't return unhandled error messages in production
        errorMessage = 'Internal server error'
        // log only error message
        console.error(formattedError.message)
      } else {
        // log complete error stack
        console.error(formattedError)
      }
    }

    res.status(statusCode).json({ ...formattedError, message: errorMessage })
  }
}

module.exports = ErrorHandler
