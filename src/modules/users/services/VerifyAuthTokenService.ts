import AppError from '@shared/errors/AppError'
import IAuthTokenProvider from '../providers/interfaces/IAuthTokenProvider'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserEntity from '../entities/IUserEntity'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

interface IRequest {
  authorizationHeader?: string
}

export default class VerifyAuthTokenService {
  constructor(
    private usersRepository: IUsersRepository,
    private authTokenProvider: IAuthTokenProvider,
  ) {}

  async execute({ authorizationHeader }: IRequest): Promise<IUserEntity> {
    if (!authorizationHeader) {
      throw new AppError('Token not provided', 401)
    }

    const [, token] = authorizationHeader.split(' ')

    if (!token) {
      throw new AppError('Token not provided', 401)
    }

    const decoded = await this.authTokenProvider.verifyToken(token)

    const { sub: id } = decoded as ITokenPayload

    if (!decoded) {
      throw new AppError('Invalid token', 401)
    }

    const user = await this.usersRepository.findById(+id)

    if (!user) {
      throw new AppError('Invalid token', 401)
    }

    return user
  }
}