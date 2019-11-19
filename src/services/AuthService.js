const httpErrors = require('http-errors')
const jwt = require('jsonwebtoken')

class AuthService {
  /**
   * @param {import('../repositories/UserRepository')} userRepository
   */
  constructor (userRepository) {
    this.userRepository = userRepository
    this.secret = process.env.SECRET
  }

  _generateToken (payload) {
    const token = jwt.sign(payload, this.secret, { expiresIn: '24h' })

    return token
  }

  _verifyToken (token) {
    return jwt.verify(token, this.secret)
  }

  _authenticate (user) {
    return this._generateToken({ email: user.email, id: user.id })
  }

  async authenticate ({ email, password }) {
    const user = await this.userRepository.authenticate({ email, password })

    if (user === null) {
      throw new httpErrors.BadRequest('Email or password incorrect')
    }

    const token = this._authenticate(user)

    return { token, user }
  }

  async verifyToken ({ token }) {
    if (!token) {
      throw new httpErrors.Unauthorized('Token not provided')
    }

    try {
      const authData = this._verifyToken(token)

      const user = await this.userRepository.getOne({ id: authData.id })

      return { data: authData, user }
    } catch (error) {
      throw new httpErrors.Unauthorized('Invalid Token')
    }
  }
}

module.exports = AuthService
