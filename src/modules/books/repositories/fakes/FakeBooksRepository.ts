import IBooksRepository from '@modules/books/repositories/IBooksRepository'
import IBookEntity from '@modules/books/entities/IBookEntity'
import IPageParamsDTO from '@shared/dtos/IPageParamsDTO'
import ICreateBookDTO from '@modules/books/dtos/ICreateBookDTO'

export default class BooksRepository implements IBooksRepository {
  private books: Array<IBookEntity> = []

  async findById(id: number): Promise<IBookEntity | undefined> {
    return this.books.find((book) => book.id === id)
  }

  async list({ page, size }: IPageParamsDTO): Promise<Array<IBookEntity>> {
    let take = this.books.length - 1
    let skip = 0

    if (page && size) {
      take = size
      skip = (page - 1) * size
    }

    return this.books.slice(skip, skip + take)
  }

  async create(data: ICreateBookDTO): Promise<IBookEntity> {
    const book = {
      ...data,
      id: this.books.length + 1,
    }

    this.books.push(book)

    return book
  }

  async update(data: IBookEntity): Promise<IBookEntity> {
    const { id } = data

    const bookIndex = this.books.findIndex((book) => book.id === id)

    const book = this.books[bookIndex]

    this.books[bookIndex] = { ...book, ...data }

    return this.books[bookIndex]
  }

  async delete(id: number): Promise<void> {
    const bookIndex = this.books.findIndex((book) => book.id === id)

    if (bookIndex < 0) {
      return
    }

    this.books.splice(bookIndex, 1)
  }
}
