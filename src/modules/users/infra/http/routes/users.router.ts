import { Router } from 'express'

import EUserRoles from '@modules/users/enums/EUserRoles'
import UserController from '../controllers/UserController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ensureHasRole from '../middlewares/ensureHasRole'

const usersRouter = Router()
const userController = new UserController()

usersRouter.get('/', userController.index)
usersRouter.get('/:id', userController.getOne)
usersRouter.post(
  '/',
  ensureAuthenticated,
  ensureHasRole(EUserRoles.admin),
  userController.create,
)
usersRouter.put(
  '/:id',
  ensureAuthenticated,
  ensureHasRole(EUserRoles.admin),
  userController.update,
)
usersRouter.delete(
  '/:id',
  ensureAuthenticated,
  ensureHasRole(EUserRoles.admin),
  userController.delete,
)

export default usersRouter
