const { ValidationError } = require('objection')

class UserRepository {
  constructor (UserModel) {
    this.model = UserModel
  }

  async list ({ pageSize, pageNumber }) {
    const query = this.model.query()

    if (pageSize && pageNumber) {
      query.page(pageNumber - 1, pageSize)
    }

    let users = await query

    if (!Array.isArray(users)) {
      users = users.results
    }

    return users.map(usr => usr.toJSON())
  }

  async getOne ({ id }) {
    const user = await this.model.query().findById(id)

    if (!user) {
      return null
    }

    return user && user.toJSON()
  }

  async create ({ data }) {
    if (!data.password) {
      throw new ValidationError({ type: 'ModelValidation', data: { password: [{ message: 'password is required', keyword: 'required' }] } })
    }

    const user = await this.model.query().insertAndFetch(data)

    return user.toJSON()
  }

  async update ({ id, data }) {
    let user = await this.model.query().findById(id)

    if (!user) {
      return null
    }

    user = await user.$query().updateAndFetch(data)

    return user.toJSON()
  }

  async delete ({ id }) {
    return this.model.query().deleteById(id)
  }

  async listFavoriteBooks ({ id, pageNumber, pageSize }) {
    const user = await this.model.query().findById(id)

    if (!user) {
      return null
    }

    const query = user.$relatedQuery('favoriteBooks').eager('category')

    if (pageSize && pageNumber) {
      query.page(pageNumber - 1, pageSize)
    }

    let favoriteBooks = await query

    if (!Array.isArray(favoriteBooks)) {
      favoriteBooks = favoriteBooks.results
    }

    return favoriteBooks.map(fvBk => fvBk.toJSON())
  }

  async addFavoriteBook ({ id, bookId }) {
    const user = await this.model.query().findById(id)

    if (!user) {
      return null
    }

    await user.$relatedQuery('favoriteBooks').relate(bookId)

    return true
  }

  async removeFavoriteBook ({ id, bookId }) {
    const user = await this.model.query().findById(id)

    if (!user) {
      return null
    }

    await user.$relatedQuery('favoriteBooks').unrelate().where('id', bookId)

    return true
  }
}

module.exports = UserRepository
