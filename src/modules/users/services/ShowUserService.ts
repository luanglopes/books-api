import AppError from '@shared/errors/AppError'
import IUserEntity from '../entities/IUserEntity'
import IUsersRepository from '../repositories/IUsersRepository'

export default class ShowUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: number): Promise<IUserEntity> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return user
  }
}
