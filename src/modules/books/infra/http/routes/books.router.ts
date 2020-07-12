import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ensureHasRole from '@modules/users/infra/http/middlewares/ensureHasRole'
import EUserRoles from '@modules/users/enums/EUserRoles'
import ensureValidation from '@shared/infra/http/routes/ensureValidation'
import BookController from '../controllers/BookController'
import booksValidators from '../validators/books.validator'

const booksRouter = Router()
const bookController = new BookController()

booksRouter.get(
  '/',
  ensureValidation(booksValidators.index),
  bookController.index,
)

booksRouter.get(
  '/:id',
  ensureValidation(booksValidators.getOne),
  bookController.getOne,
)

booksRouter.post(
  '/',
  ensureValidation(booksValidators.create),
  ensureAuthenticated,
  ensureHasRole(EUserRoles.admin, EUserRoles.librarian),
  bookController.create,
)

booksRouter.put(
  '/:id',
  ensureValidation(booksValidators.update),
  ensureAuthenticated,
  ensureHasRole(EUserRoles.admin, EUserRoles.librarian),
  bookController.update,
)

booksRouter.delete(
  '/:id',
  ensureValidation(booksValidators.delete),
  ensureAuthenticated,
  ensureHasRole(EUserRoles.admin, EUserRoles.librarian),
  bookController.delete,
)

export default booksRouter
