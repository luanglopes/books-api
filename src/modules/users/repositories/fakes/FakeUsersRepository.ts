import IUserEntity from '@modules/users/entities/IUserEntity'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import EUserRoles from '@modules/users/enums/EUserRoles'
import IUsersRepository from '../IUsersRepository'

export default class FakeUsersRepository implements IUsersRepository {
  private users: Array<IUserEntity> = []

  async findById(id: number): Promise<IUserEntity | undefined> {
    return this.users.find((user) => user.id === id)
  }

  async create(data: ICreateUserDTO): Promise<IUserEntity> {
    const newUser: IUserEntity = {
      role: EUserRoles.user,
      id: this.users.length + 1,
      ...data,
    }

    this.users.push(newUser)

    return newUser
  }
}
