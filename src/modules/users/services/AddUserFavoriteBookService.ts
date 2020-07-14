import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IBookEntity from '@modules/books/entities/IBookEntity'
import IBooksRepository from '@modules/books/repositories/IBooksRepository'
import IUserEntity from '../entities/IUserEntity'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  userId: IUserEntity['id']
  bookId: IBookEntity['id']
}
@injectable()
export default class AddUserFavoriteBookService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  async execute({ userId, bookId }: IRequest): Promise<void> {
    const [user, book] = await Promise.all([
      this.usersRepository.findById(userId, { relations: ['favoriteBooks'] }),
      this.booksRepository.findById(bookId),
    ])

    if (!user) {
      throw new AppError('User does not exists')
    }

    if (!book) {
      throw new AppError('Book does not exists')
    }

    await this.usersRepository.addFavoriteBook(
      { ...user, favoriteBooks: user.favoriteBooks || [] },
      book,
    )
  }
}
