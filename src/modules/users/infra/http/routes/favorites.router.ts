import { Router } from 'express'

import FavoriteController from '../controllers/FavoriteController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import favoritesValidators from '../validators/favorites.validator'
import ensureValidation from '../middlewares/ensureValidation'

const favoriteRouter = Router({ mergeParams: true })
const favoriteController = new FavoriteController()

favoriteRouter.get('/', ensureAuthenticated, favoriteController.index)

favoriteRouter.post(
  '/',
  ensureValidation(favoritesValidators.create),
  ensureAuthenticated,
  favoriteController.create,
)

favoriteRouter.delete(
  '/:bookId',
  ensureValidation(favoritesValidators.delete),
  ensureAuthenticated,
  favoriteController.delete,
)

export default favoriteRouter
