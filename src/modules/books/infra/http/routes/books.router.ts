import { Router } from 'express'

import BookController from '../controllers/BookController'

const booksRouter = Router()
const bookController = new BookController()

booksRouter.get('/', bookController.index)
booksRouter.get('/:id', bookController.getOne)
booksRouter.post('/', bookController.create)
booksRouter.put('/:id', bookController.update)
booksRouter.delete('/:id', bookController.delete)

export default booksRouter
