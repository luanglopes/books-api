
const autoBind = require('auto-bind')

class BookController {
  /**
   * @param {import('../services/BookService')} bookService
   */
  constructor (bookService) {
    this.bookService = bookService

    autoBind(this)
  }

  async list (req, res, next) {
    const { pageNumber, pageSize } = req.query

    try {
      const books = await this.bookService.list({ pageNumber, pageSize })

      res.json({ books })
    } catch (error) {
      next(error)
    }
  }

  async getOne (req, res, next) {
    const { id } = req.params

    try {
      const book = await this.bookService.getOne({ id })

      res.json({ book })
    } catch (error) {
      next(error)
    }
  }

  async create (req, res, next) {
    const { body } = req

    try {
      const book = await this.bookService.create({ data: body })

      res.status(201).json({ book })
    } catch (error) {
      next(error)
    }
  }

  async update (req, res, next) {
    const { body } = req
    const { id } = req.params

    try {
      const book = await this.bookService.update({ id, data: body })

      res.json({ book })
    } catch (error) {
      next(error)
    }
  }

  async delete (req, res, next) {
    const { id } = req.params

    try {
      await this.bookService.delete({ id })

      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = BookController
