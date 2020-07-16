import { Router } from 'express'

import ensureValidation from '@shared/infra/http/routes/ensureValidation'
import FavoriteController from '../controllers/FavoriteController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import favoritesValidators from '../validators/favorites.validator'

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
