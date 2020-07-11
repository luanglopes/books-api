import { Request, Response, NextFunction } from 'express'

import VerifyAuthTokenService from '@modules/users/services/VerifyAuthTokenService'
import JWTTokenProvider from '@modules/users/providers/TokenProvider/implementations/JWTTokenProvider'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

export default async function ensureAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const { authorization } = req.headers

  const usersRepository = new UsersRepository()
  const authTokenProvider = new JWTTokenProvider()
  const verifyAuthTokenService = new VerifyAuthTokenService(
    usersRepository,
    authTokenProvider,
  )

  const user = await verifyAuthTokenService.execute({
    authorizationHeader: authorization,
  })

  req.user = {
    id: user.id,
  }

  next()
}
