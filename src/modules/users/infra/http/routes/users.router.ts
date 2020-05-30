import { Router } from 'express'

import UserController from '../controllers/UserController'

const usersRouter = Router()
const userController = new UserController()

usersRouter.get('/', userController.index)
usersRouter.get('/:id', userController.getOne)
usersRouter.post('/', userController.create)
usersRouter.put('/:id', userController.update)
usersRouter.delete('/:id', userController.delete)

export default usersRouter
