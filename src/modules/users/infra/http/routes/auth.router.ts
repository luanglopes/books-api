import { Router } from 'express'
import { celebrate } from 'celebrate'

import AuthController from '../controllers/AuthController'
import authValidators from '../validators/auth.validator'

const authRouter = Router()
const authController = new AuthController()

authRouter.post('/', celebrate(authValidators.login), authController.login)

export default authRouter
