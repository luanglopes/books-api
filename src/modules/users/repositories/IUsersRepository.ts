import IPageParamsDTO from '@shared/dtos/IPageParamsDTO'
import IUserEntity from '../entities/IUserEntity'
import ICreateUserDTO from '../dtos/ICreateUserDTO'

export default interface IUsersRepository {
  list(params: IPageParamsDTO): Promise<Array<IUserEntity>>

  findById(id: IUserEntity['id']): Promise<IUserEntity | undefined>

  create(data: ICreateUserDTO): Promise<IUserEntity>

  update(book: IUserEntity): Promise<IUserEntity>

  delete(id: IUserEntity['id']): Promise<void>

  findByEmail(email: IUserEntity['email']): Promise<IUserEntity | undefined>

  findByPhone(phone: IUserEntity['phone']): Promise<IUserEntity | undefined>
}
