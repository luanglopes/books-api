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

  async getOne (req, res, next) {
    const { id } = req.params

    try {
      const user = await this.userService.getOne({ id })

      res.json({ user })
    } catch (error) {
      next(error)
    }
  }

  async create (req, res, next) {
    const { body } = req

    try {
      const user = await this.userService.create({ data: body })

      res.status(201).json({ user })
    } catch (error) {
      next(error)
    }
  }

  async update (req, res, next) {
    const { body } = req
    const { id } = req.params

    try {
      const user = await this.userService.update({ id, data: body })

      res.json({ user })
    } catch (error) {
      next(error)
    }
  }

  async delete (req, res, next) {
    const { id } = req.params

    try {
      await this.userService.delete({ id })

      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  async listFavoriteBooks (req, res, next) {
    const { id } = req.params
    const { pageNumber, pageSize } = req.query

    try {
      const favoriteBooks = await this.userService.listFavoriteBooks({ id, pageNumber, pageSize })

      res.json({ favoriteBooks })
    } catch (error) {
      next(error)
    }
  }

  async addFavoriteBook (req, res, next) {
    const { id } = req.params
    const { bookId } = req.body

    try {
      await this.userService.addFavoriteBook({ id, bookId })

      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  async removeFavoriteBook (req, res, next) {
    const { id, bookId } = req.params

    try {
      await this.userService.removeFavoriteBook({ id, bookId })

      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
