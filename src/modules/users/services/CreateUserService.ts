import AppError from '@shared/errors/AppError'
import ICreateUserDTO from '../dtos/ICreateUserDTO'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserEntity from '../entities/IUserEntity'
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider'

export default class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute(data: ICreateUserDTO): Promise<IUserEntity> {
    const [userWithEmail, userWithPhone] = await Promise.all([
      this.usersRepository.findByEmail(data.email),
      this.usersRepository.findByPhone(data.phone),
    ])

    if (userWithEmail) {
      throw new AppError('Email already in use')
    }

    if (userWithPhone) {
      throw new AppError('Phone already in use')
    }

    data.password = await this.hashProvider.generateHash(data.password)

    const user = await this.usersRepository.create(data)

    return user
  }
}
