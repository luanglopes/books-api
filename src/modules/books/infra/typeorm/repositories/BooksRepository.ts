import { Repository, getRepository } from 'typeorm'

import IBooksRepository from '@modules/books/repositories/IBooksRepository'
import IBookEntity from '@modules/books/entities/IBookEntity'
import IPageParamsDTO from '@shared/dtos/IPageParamsDTO'
import ICreateBookDTO from '@modules/books/dtos/ICreateBookDTO'
import Book from '../entities/Book'

export default class BooksRepository implements IBooksRepository {
  private ormRepository: Repository<Book>

  constructor() {
    this.ormRepository = getRepository(Book)
  }

  async findById(id: number): Promise<IBookEntity | undefined> {
    const book = await this.ormRepository.findOne(id)

    return book
  }

  async list({ page, size }: IPageParamsDTO): Promise<Array<IBookEntity>> {
    let pageParams

    if (page && size) {
      const take = size
      const skip = (page - 1) * size
      pageParams = { skip, take }
    }

    const books = await this.ormRepository.find(pageParams)

    return books
  }

  async create(data: ICreateBookDTO): Promise<IBookEntity> {
    const book = this.ormRepository.create(data)

    await this.ormRepository.save(book)

    return book
  }

  async update(book: IBookEntity): Promise<IBookEntity> {
    return this.ormRepository.save(book)
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.delete({ id })
  }
}
