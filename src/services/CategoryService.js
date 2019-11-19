const createError = require('http-errors')

class CategoryService {
  /**
   * @param {import('../repositories/CategoryRepository')} categoryRepository
   */
  constructor (categoryRepository) {
    this.categoryRepository = categoryRepository
  }

  async list ({ pageSize, pageNumber }) {
    const parsedPageSize = parseInt(pageSize, 10)
    const parsedPageNumber = parseInt(pageNumber, 10)

    const categories = await this.categoryRepository.list({ pageSize: parsedPageSize, pageNumber: parsedPageNumber })

    return categories
  }

  async getOne ({ id }) {
    const parsedId = parseInt(id, 10)

    const category = await this.categoryRepository.getOne({ id: parsedId })

    if (category === null) {
      throw new createError.NotFound('Category Not Found')
    }

    return category
  }

  async create ({ data }) {
    const category = await this.categoryRepository.create({ data })

    return category
  }

  async update ({ id, data }) {
    const parsedId = parseInt(id, 10)
    const category = await this.categoryRepository.update({ id: parsedId, data })

    if (category === null) {
      throw new createError.NotFound('Category Not Found')
    }

    return category
  }

  async delete ({ id }) {
    const parsedId = parseInt(id, 10)
    await this.categoryRepository.delete({ id: parsedId })
  }

  async listBooks ({ id, pageSize, pageNumber }) {
    const parsedId = parseInt(id, 10)
    const parsedPageSize = parseInt(pageSize, 10)
    const parsedPageNumber = parseInt(pageNumber, 10)

    const books = await this.categoryRepository.listBooks({ id: parsedId, pageNumber: parsedPageNumber, pageSize: parsedPageSize })

    return books
  }
}

module.exports = CategoryService
