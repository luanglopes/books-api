import { Router } from 'express'

import EUserRoles from '@modules/users/enums/EUserRoles'
import UserController from '../controllers/UserController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ensureHasRole from '../middlewares/ensureHasRole'
import usersValidators from '../validators/users.validator'
import ensureValidation from '../middlewares/ensureValidation'

const usersRouter = Router()
const userController = new UserController()

usersRouter.get(
  '/',
  ensureValidation(usersValidators.index),
  userController.index,
)

usersRouter.get(
  '/:id',
  ensureValidation(usersValidators.getOne),
  userController.getOne,
)

usersRouter.post(
  '/',
  ensureValidation(usersValidators.create),
  userController.create,
)

usersRouter.put(
  '/:id',
  ensureValidation(usersValidators.update),
  ensureAuthenticated,
  ensureHasRole(EUserRoles.admin),
  userController.update,
)

usersRouter.delete(
  '/:id',
  ensureValidation(usersValidators.delete),
  ensureAuthenticated,
  ensureHasRole(EUserRoles.admin),
  userController.delete,
)

export default usersRouter
