const autoBind = require('auto-bind')

class CategoryController {
  /**
   * @param {import('../services/CategoryService')} categoryService
   */
  constructor (categoryService) {
    this.categoryService = categoryService

    autoBind(this)
  }

  async list (req, res, next) {
    const { pageNumber, pageSize } = req.query

    try {
      const categories = await this.categoryService.list({ pageNumber, pageSize })

      res.json({ categories })
    } catch (error) {
      next(error)
    }
  }

  async getOne (req, res, next) {
    const { id } = req.params

    try {
      const category = await this.categoryService.getOne({ id })

      res.json({ category })
    } catch (error) {
      next(error)
    }
  }

  async create (req, res, next) {
    const { body } = req

    try {
      const category = await this.categoryService.create({ data: body })

      res.status(201).json({ category })
    } catch (error) {
      next(error)
    }
  }

  async update (req, res, next) {
    const { body } = req
    const { id } = req.params

    try {
      const category = await this.categoryService.update({ id, data: body })

      res.json({ category })
    } catch (error) {
      next(error)
    }
  }

  async delete (req, res, next) {
    const { id } = req.params

    try {
      await this.categoryService.delete({ id })

      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  async listBooks (req, res, next) {
    const { id } = req.params
    const { pageNumber, pageSize } = req.query

    try {
      const books = await this.categoryService.listBooks({ id, pageSize, pageNumber })

      res.json({ books })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CategoryController
