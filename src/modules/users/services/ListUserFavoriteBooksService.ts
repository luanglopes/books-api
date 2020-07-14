import { injectable, inject } from 'tsyringe'

import IBookEntity from '@modules/books/entities/IBookEntity'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserEntity from '../entities/IUserEntity'

@injectable()
export default class ListUserFavoriteBooksService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  async execute(id: IUserEntity['id']): Promise<Array<IBookEntity>> {
    const user = await this.usersRepository.findById(id, {
      relations: ['favoriteBooks'],
    })

    if (!user) {
      throw new AppError('User does not exists')
    }

    return user.favoriteBooks || []
  }
}
