'use strict'

class BookRepository {
  constructor (BookModel) {
    this.model = BookModel
  }

  async list ({ pageSize, pageNumber }) {
    const query = this.model.query().eager('category')

    if (pageSize && pageNumber) {
      query.page(pageNumber - 1, pageSize)
    }

    let books = await query

    if (!Array.isArray(books)) {
      books = books.results
    }

    return books.map(book => book.toJSON())
  }

  async getOne ({ id }) {
    const book = await this.model.query().findById(id).eager('category')

    if (!book) {
      return null
    }

    return book && book.toJSON()
  }

  async create ({ data }) {
    const book = await this.model.query().insertAndFetch(data)

    return book.toJSON()
  }

  async update ({ id, data }) {
    let book = await this.model.query().findById(id)

    if (!book) {
      return null
    }

    book = await book.$query().updateAndFetch(data)

    return book.toJSON()
  }

  async delete ({ id }) {
    return this.model.query().deleteById(id)
  }
}

module.exports = BookRepository
