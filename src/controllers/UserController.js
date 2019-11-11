const autoBind = require('auto-bind')

const User = require('../models/User')
const UserRepository = require('../repositories/UserRepository')
const UserService = require('../services/UserService')

class UserController {
  constructor () {
    this.userService = new UserService(UserRepository, User)

    autoBind(this)
  }

  async list (req, res, next) {
    const { pageNumber, pageSize } = req.query

    try {
      const users = await this.userService.list({ pageNumber, pageSize })

      res.json({ users })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
