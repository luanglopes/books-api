import bcrypt from 'bcrypt'

import AppError from '@shared/errors/AppError'
import ICreateUserDTO from '../dtos/ICreateUserDTO'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserEntity from '../entities/IUserEntity'

interface IRequest {
  id: number
  data: ICreateUserDTO
}

export default class UpdateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ id, data }: IRequest): Promise<IUserEntity> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User does not exists', 404)
    }

    const [userWithEmail, userWithPhone] = await Promise.all([
      this.usersRepository.findByEmail(data.email),
      this.usersRepository.findByPhone(data.phone),
    ])

    if (userWithEmail && userWithEmail.id !== id) {
      throw new AppError('Email already in use')
    }

    if (userWithPhone && userWithPhone.id !== id) {
      throw new AppError('Phone already in use')
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10)
    }

    Object.assign(user, data)

    await this.usersRepository.update(user)

    return user
  }
}
