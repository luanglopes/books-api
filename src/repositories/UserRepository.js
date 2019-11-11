class UserRepository {
  constructor (UserModel) {
    this.model = UserModel
  }

  async list ({ pageSize, pageNumber }) {
    const query = this.model.query()

    if (pageSize && pageNumber) {
      query.page(pageNumber - 1, pageSize)
    }

    const users = await query

    return users.map(usr => usr.toJSON())
  }
}

module.exports = UserRepository
