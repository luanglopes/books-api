import IPageParamsDTO from '@shared/dtos/IPageParamsDTO'
import IBookEntity from '@modules/books/entities/IBookEntity'
import IUserEntity from '../entities/IUserEntity'
import ICreateUserDTO from '../dtos/ICreateUserDTO'

export interface IFindByIdOptions {
  relations?: Array<string>
}

export default interface IUsersRepository {
  list(params: IPageParamsDTO): Promise<Array<IUserEntity>>

  findById(
    id: IUserEntity['id'],
    options?: IFindByIdOptions,
  ): Promise<IUserEntity | undefined>

  create(data: ICreateUserDTO): Promise<IUserEntity>

  update(book: IUserEntity): Promise<IUserEntity>

  delete(id: IUserEntity['id']): Promise<void>

  findByEmail(email: IUserEntity['email']): Promise<IUserEntity | undefined>

  findByPhone(phone: IUserEntity['phone']): Promise<IUserEntity | undefined>

  addFavoriteBook(user: Required<IUserEntity>, book: IBookEntity): Promise<void>

  removeFavoriteBook(
    userId: IUserEntity['id'],
    bookId: IBookEntity['id'],
  ): Promise<void>
}
