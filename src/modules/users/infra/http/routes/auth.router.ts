import { Router } from 'express'

import AuthController from '../controllers/AuthController'
import authValidators from '../validators/auth.validator'
import ensureValidation from '../../../../../shared/infra/http/routes/ensureValidation'

const authRouter = Router()
const authController = new AuthController()

authRouter.post(
  '/',
  ensureValidation(authValidators.login),
  authController.login,
)

export default authRouter
