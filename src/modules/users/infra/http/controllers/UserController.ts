import { Request, Response } from 'express'

import ShowUserService from '@modules/users/services/ShowUserService'
import UpdateUserService from '@modules/users/services/UpdateUserService'
import CreateUserService from '@modules/users/services/CreateUserService'
import BcryptHashProvider from '@modules/users/providers/HashProvider/implementations/BcryptHashProvider'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

export default class UserController {
  async index(req: Request, res: Response): Promise<void> {
    const { page, size } = req.query
    const parsedSize = size ? +size : undefined
    const parsedPage = page ? +page : undefined

    const usersRepository = new UsersRepository()

    const users = await usersRepository.list({
      page: parsedPage,
      size: parsedSize,
    })

    res.json(
      users.map((user) => {
        delete user.password

        return user
      }),
    )
  }

  async getOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    const showBookService = new ShowUserService(new UsersRepository())

    const user = await showBookService.execute(+id)

    delete user.password

    res.json(user)
  }

  async create(req: Request, res: Response): Promise<void> {
    const data = req.body

    const createUserService = new CreateUserService(
      new UsersRepository(),
      new BcryptHashProvider(),
    )

    const user = await createUserService.execute(data)

    delete user.password

    res.status(201).json(user)
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const data = req.body

    const updateBookService = new UpdateUserService(
      new UsersRepository(),
      new BcryptHashProvider(),
    )

    const user = await updateBookService.execute({ id: +id, data })

    delete user.password

    res.json(user)
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    const usersRepository = new UsersRepository()

    await usersRepository.delete(+id)

    res.sendStatus(204)
  }
}
