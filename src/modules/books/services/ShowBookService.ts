import AppError from '@shared/errors/AppError'
import IBookEntity from '../entities/IBookEntity'
import IBooksRepository from '../repositories/IBooksRepository'

export default class ShowBookService {
  constructor(private booksRepository: IBooksRepository) {}

  async execute(id: number): Promise<IBookEntity> {
    const book = await this.booksRepository.findById(id)

    if (!book) {
      throw new AppError('Book not found', 404)
    }

    return book
  }
}
