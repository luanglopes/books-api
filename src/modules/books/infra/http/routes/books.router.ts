import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ensureHasRole from '@modules/users/infra/http/middlewares/ensureHasRole'
import EUserRoles from '@modules/users/enums/EUserRoles'
import BookController from '../controllers/BookController'

const booksRouter = Router()
const bookController = new BookController()

booksRouter.get('/', bookController.index)
booksRouter.get('/:id', bookController.getOne)
booksRouter.post(
  '/',
  ensureAuthenticated,
  ensureHasRole(EUserRoles.admin, EUserRoles.librarian),
  bookController.create,
)
booksRouter.put(
  '/:id',
  ensureAuthenticated,
  ensureHasRole(EUserRoles.admin, EUserRoles.librarian),
  bookController.update,
)
booksRouter.delete(
  '/:id',
  ensureAuthenticated,
  ensureHasRole(EUserRoles.admin, EUserRoles.librarian),
  bookController.delete,
)

export default booksRouter
