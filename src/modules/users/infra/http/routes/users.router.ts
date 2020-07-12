import { Router } from 'express'
import { celebrate } from 'celebrate'

import EUserRoles from '@modules/users/enums/EUserRoles'
import UserController from '../controllers/UserController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ensureHasRole from '../middlewares/ensureHasRole'
import usersValidators from '../validators/users.validator'

const usersRouter = Router()
const userController = new UserController()

usersRouter.get('/', celebrate(usersValidators.index), userController.index)

usersRouter.get(
  '/:id',
  celebrate(usersValidators.getOne),
  userController.getOne,
)

usersRouter.post('/', celebrate(usersValidators.create), userController.create)

usersRouter.put(
  '/:id',
  celebrate(usersValidators.update),
  ensureAuthenticated,
  ensureHasRole(EUserRoles.admin),
  userController.update,
)

usersRouter.delete(
  '/:id',
  celebrate(usersValidators.delete),
  ensureAuthenticated,
  ensureHasRole(EUserRoles.admin),
  userController.delete,
)

export default usersRouter
