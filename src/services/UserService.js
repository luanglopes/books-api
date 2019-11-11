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
}

module.exports = UserService
