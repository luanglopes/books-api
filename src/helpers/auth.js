module.exports = {
  getTokenFromHeaders ({ headers }) {
    const { authorization } = headers

    if (!authorization) {
      return null
    }

    const [, token] = authorization.split(' ').map(part => part.trim())

    if (!token) {
      return null
    }

    return token
  },
}
