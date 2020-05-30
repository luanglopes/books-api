import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import BookController from '../controllers/BookController'

const booksRouter = Router()
const bookController = new BookController()

booksRouter.get('/', bookController.index)
booksRouter.get('/:id', bookController.getOne)
booksRouter.post('/', ensureAuthenticated, bookController.create)
booksRouter.put('/:id', ensureAuthenticated, bookController.update)
booksRouter.delete('/:id', ensureAuthenticated, bookController.delete)

export default booksRouter
