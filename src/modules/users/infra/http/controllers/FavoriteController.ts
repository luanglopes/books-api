import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListUserFavoriteBooksService from '@modules/users/services/ListUserFavoriteBooksService'
import AddUserFavoriteBookService from '@modules/users/services/AddUserFavoriteBookService'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

export default class FavoriteController {
  async index(req: Request, res: Response): Promise<void> {
    const { id } = req.user

    const listFavoriteBooksService = container.resolve(
      ListUserFavoriteBooksService,
    )
    const favorites = await listFavoriteBooksService.execute(id)

    res.json(favorites)
  }

  async create(req: Request, res: Response): Promise<void> {
    const { id } = req.user
    const { bookId } = req.body

    const addUserFavoriteBookService = container.resolve(
      AddUserFavoriteBookService,
    )

    await addUserFavoriteBookService.execute({ userId: id, bookId })

    res.status(201).json({ message: 'Favorite added' })
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.user
    const { bookId } = req.params

    const usersRepository = new UsersRepository()

    await usersRepository.removeFavoriteBook(id, +bookId)

    res.sendStatus(204)
  }
}
