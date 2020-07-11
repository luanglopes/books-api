import { Request, Response } from 'express'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import BcryptHashProvider from '@modules/users/providers/HashProvider/implementations/BcryptHashProvider'
import JWTTokenProvider from '@modules/users/providers/TokenProvider/implementations/JWTTokenProvider'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

export default class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    const usersRepository = new UsersRepository()
    const hashProvider = new BcryptHashProvider()
    const authTokenProvider = new JWTTokenProvider()
    const authenticateUserService = new AuthenticateUserService(
      usersRepository,
      hashProvider,
      authTokenProvider,
    )

    const authData = await authenticateUserService.execute({ email, password })

    delete authData.user.password

    res.json(authData)
  }
}
