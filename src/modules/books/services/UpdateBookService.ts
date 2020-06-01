import AppError from '@shared/errors/AppError'
import IBookEntity from '../entities/IBookEntity'
import IBooksRepository from '../repositories/IBooksRepository'
import ICreateBookDTO from '../dtos/ICreateBookDTO'

interface IRequest {
  id: number
  data: ICreateBookDTO
}

export default class UpdateBookService {
  constructor(private booksRepository: IBooksRepository) {}

  async execute({ id, data }: IRequest): Promise<IBookEntity> {
    const book = await this.booksRepository.findById(id)

    if (!book) {
      throw new AppError('Book does not exists', 404)
    }

    Object.assign(book, data)

    await this.booksRepository.update(book)

    return book
  }
}
