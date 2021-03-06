import IBookEntity from '@modules/books/entities/IBookEntity'
import EUserRoles from '../enums/EUserRoles'

export default interface IUserEntity {
  id: number
  name: string
  birthday: Date
  phone: string
  email: string
  password: string
  role: EUserRoles
  favoriteBooks?: Array<IBookEntity>
}
