import IBookEntity from '@modules/books/entities/IBookEntity'
import IBooksRepository from '@modules/books/repositories/IBooksRepository'
import AppError from '@shared/errors/AppError'
import IUserEntity from '../entities/IUserEntity'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  userId: IUserEntity['id']
  bookId: IBookEntity['id']
}

export default class AddUserFavoriteBookService {
  constructor(
    private usersRepoitory: IUsersRepository,
    private booksRepository: IBooksRepository,
  ) {}

  async execute({ userId, bookId }: IRequest): Promise<void> {
    const [user, book] = await Promise.all([
      this.usersRepoitory.findById(userId, { relations: ['favoriteBooks'] }),
      this.booksRepository.findById(bookId),
    ])

    if (!user) {
      throw new AppError('User does not exists')
    }

    if (!book) {
      throw new AppError('Book does not exists')
    }

    await this.usersRepoitory.addFavoriteBook(
      { ...user, favoriteBooks: user.favoriteBooks || [] },
      book,
    )
  }
}
