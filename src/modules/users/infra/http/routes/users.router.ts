import { Router } from 'express'

import UserController from '../controllers/UserController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router()
const userController = new UserController()

usersRouter.get('/', userController.index)
usersRouter.get('/:id', userController.getOne)
usersRouter.post('/', ensureAuthenticated, userController.create)
usersRouter.put('/:id', ensureAuthenticated, userController.update)
usersRouter.delete('/:id', ensureAuthenticated, userController.delete)

export default usersRouter
