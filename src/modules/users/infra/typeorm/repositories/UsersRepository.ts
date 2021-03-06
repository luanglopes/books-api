import { Repository, getRepository } from 'typeorm'

import IUsersRepository, {
  IFindByIdOptions,
} from '@modules/users/repositories/IUsersRepository'
import IUserEntity from '@modules/users/entities/IUserEntity'
import IPageParamsDTO from '@shared/dtos/IPageParamsDTO'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IBookEntity from '@modules/books/entities/IBookEntity'
import User from '../entities/User'

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  async findById(
    id: IUserEntity['id'],
    options: IFindByIdOptions = {},
  ): Promise<IUserEntity | undefined> {
    const { relations } = options

    const user = await this.ormRepository.findOne({
      where: { id },
      relations,
    })

    return user
  }

  async list({ page, size }: IPageParamsDTO): Promise<Array<IUserEntity>> {
    let pageParams

    if (page && size) {
      const take = size
      const skip = (page - 1) * size
      pageParams = { skip, take }
    }

    const users = await this.ormRepository.find(pageParams)

    return users
  }

  async create(data: ICreateUserDTO): Promise<IUserEntity> {
    const user = this.ormRepository.create(data)

    await this.ormRepository.save(user)

    return user
  }

  async update(user: IUserEntity): Promise<IUserEntity> {
    return this.ormRepository.save(user)
  }

  async delete(id: IUserEntity['id']): Promise<void> {
    await this.ormRepository.delete({ id })
  }

  async findByEmail(
    email: IUserEntity['email'],
  ): Promise<IUserEntity | undefined> {
    const user = await this.ormRepository.findOne({ email })

    return user
  }

  async findByPhone(
    phone: IUserEntity['phone'],
  ): Promise<IUserEntity | undefined> {
    const user = await this.ormRepository.findOne({ phone })

    return user
  }

  async addFavoriteBook(
    user: Required<IUserEntity>,
    book: IBookEntity,
  ): Promise<void> {
    user.favoriteBooks.push(book)

    await this.ormRepository.save(user)
  }

  async removeFavoriteBook(
    userId: IUserEntity['id'],
    bookId: IBookEntity['id'],
  ): Promise<void> {
    const user = await this.ormRepository.findOne({
      where: { id: userId },
      relations: ['favoriteBooks'],
    })

    if (user) {
      user.favoriteBooks = user.favoriteBooks.filter((favorite) => {
        return favorite.id !== bookId
      })

      await this.ormRepository.save(user)
    }
  }
}
