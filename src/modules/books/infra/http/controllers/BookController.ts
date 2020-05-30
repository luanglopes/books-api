import { Request, Response } from 'express'

import ShowBookService from '@modules/books/services/ShowBookService'
import UpdateBookService from '@modules/books/services/UpdateBookService'
import BooksRepository from '../../typeorm/repositories/BooksRepository'

export default class BookController {
  async index(req: Request, res: Response): Promise<void> {
    const { page, size } = req.query
    const parsedSize = size ? +size : undefined
    const parsedPage = page ? +page : undefined

    const booksRepository = new BooksRepository()

    const books = await booksRepository.list({
      page: parsedPage,
      size: parsedSize,
    })

    res.json(books)
  }

  async getOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    const showBookService = new ShowBookService(new BooksRepository())

    const book = await showBookService.execute(+id)

    res.json(book)
  }

  async create(req: Request, res: Response): Promise<void> {
    const data = req.body

    const booksRepository = new BooksRepository()

    const book = await booksRepository.create(data)

    res.status(201).json(book)
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const data = req.body

    const updateBookService = new UpdateBookService(new BooksRepository())

    const book = await updateBookService.execute({ id: +id, data })

    res.json(book)
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    const booksRepository = new BooksRepository()

    await booksRepository.delete(+id)

    res.sendStatus(204)
  }
}
