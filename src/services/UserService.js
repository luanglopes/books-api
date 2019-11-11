const createError = require('http-errors')

class UserService {
  /**
   * @param {typeof import('../repositories/UserRepository')} UserRepository
   */
  constructor (UserRepository, UserModel) {
    this.userRepository = new UserRepository(UserModel)
  }

  async list ({ pageSize, pageNumber }) {
    const parsedPageSize = parseInt(pageSize, 10)
    const parsedPageNumber = parseInt(pageNumber, 10)

    const users = await this.userRepository.list({ pageSize: parsedPageSize, pageNumber: parsedPageNumber })

    return users
  }

  async getOne ({ id }) {
    const parsedId = parseInt(id, 10)

    const user = await this.userRepository.getOne({ id: parsedId })

    if (user === null) {
      throw new createError.NotFound('User Not Found')
    }

    return user
  }

  async create ({ data }) {
    const user = await this.userRepository.create({ data })

    return user
  }

  async update ({ id, data }) {
    const parsedId = parseInt(id, 10)
    const user = await this.userRepository.update({ id: parsedId, data })

    if (user === null) {
      throw new createError.NotFound('User Not Found')
    }

    return user
  }

  async delete ({ id }) {
    const parsedId = parseInt(id)
    await this.userRepository.delete({ id: parsedId })
  }

  async listFavoriteBooks ({ id, pageNumber, pageSize }) {
    const parsedId = parseInt(id, 10)
    const parsedPageSize = parseInt(pageSize, 10)
    const parsedPageNumber = parseInt(pageNumber, 10)
    const favoriteBooks = await this.userRepository.listFavoriteBooks({ id: parsedId, pageNumber: parsedPageNumber, pageSize: parsedPageSize })

    if (favoriteBooks === null) {
      throw new createError.NotFound('User Not Found')
    }

    return favoriteBooks
  }

  async addFavoriteBook ({ id, bookId }) {
    const parsedId = parseInt(id, 10)
    const parsedBookId = parseInt(bookId, 10)
    const isAdded = await this.userRepository.addFavoriteBook({ id: parsedId, bookId: parsedBookId })

    if (isAdded === null) {
      throw new createError.NotFound('User Not Found')
    }
  }

  async removeFavoriteBook ({ id, bookId }) {
    const parsedId = parseInt(id, 10)
    const parsedBookId = parseInt(bookId, 10)
    const isRemoved = await this.userRepository.removeFavoriteBook({ id: parsedId, bookId: parsedBookId })

    if (isRemoved === null) {
      throw new createError.NotFound('User Not Found')
    }
  }
}

module.exports = UserService
