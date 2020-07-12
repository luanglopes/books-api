import { Router } from 'express'
import { celebrate } from 'celebrate'

import FavoriteController from '../controllers/FavoriteController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import favoritesValidators from '../validators/favorites.validator'

const favoriteRouter = Router({ mergeParams: true })
const favoriteController = new FavoriteController()

favoriteRouter.get('/', ensureAuthenticated, favoriteController.index)

favoriteRouter.post(
  '/',
  celebrate(favoritesValidators.create),
  ensureAuthenticated,
  favoriteController.create,
)

favoriteRouter.delete(
  '/:bookId',
  celebrate(favoritesValidators.delete),
  ensureAuthenticated,
  favoriteController.delete,
)

export default favoriteRouter
