class CategoryRepository {
  constructor (CategoryModel) {
    this.model = CategoryModel
  }

  async list ({ pageSize, pageNumber }) {
    const query = this.model.query()

    if (pageSize && pageNumber) {
      query.page(pageNumber - 1, pageSize)
    }

    let categories = await query

    if (!Array.isArray(categories)) {
      categories = categories.results
    }

    return categories.map(book => book.toJSON())
  }

  async getOne ({ id }) {
    const category = await this.model.query().findById(id)

    if (!category) {
      return null
    }

    return category && category.toJSON()
  }

  async create ({ data }) {
    const category = await this.model.query().insertAndFetch(data)

    return category.toJSON()
  }

  async update ({ id, data }) {
    let category = await this.model.query().findById(id)

    if (!category) {
      return null
    }

    category = await category.$query().updateAndFetch(data)

    return category.toJSON()
  }

  async delete ({ id }) {
    return this.model.query().deleteById(id)
  }

  async listBooks ({ id, pageNumber, pageSize }) {
    const category = await this.model.query().findById(id)

    if (!category) {
      return null
    }

    const query = category.$relatedQuery('books')

    if (pageSize && pageNumber) {
      query.page(pageNumber - 1, pageSize)
    }

    let books = await query

    if (!Array.isArray(books)) {
      books = books.results
    }

    return books.map(book => book.toJSON())
  }
}

module.exports = CategoryRepository
