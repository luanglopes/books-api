const httpErrors = require('http-errors')

class BookService {
  /**
   * @param {import('../repositories/BookRepository')} bookRepository
   */
  constructor (bookRepository) {
    this.bookRepository = bookRepository
  }

  async list ({ pageSize, pageNumber }) {
    const parsedPageSize = parseInt(pageSize, 10)
    const parsedPageNumber = parseInt(pageNumber, 10)

    const books = await this.bookRepository.list({ pageSize: parsedPageSize, pageNumber: parsedPageNumber })

    return books
  }

  async getOne ({ id }) {
    const parsedId = parseInt(id, 10)

    const book = await this.bookRepository.getOne({ id: parsedId })

    if (book === null) {
      throw new httpErrors.NotFound('Book Not Found')
    }

    return book
  }

  async create ({ data }) {
    const book = await this.bookRepository.create({ data })

    return book
  }

  async update ({ id, data }) {
    const parsedId = parseInt(id, 10)
    const book = await this.bookRepository.update({ id: parsedId, data })

    if (book === null) {
      throw new httpErrors.NotFound('Book Not Found')
    }

    return book
  }

  async delete ({ id }) {
    const parsedId = parseInt(id, 10)
    await this.bookRepository.delete({ id: parsedId })
  }
}

module.exports = BookService
