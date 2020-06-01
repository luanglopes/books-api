import { Router } from 'express'

import FavoriteController from '../controllers/FavoriteController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const favoriteRouter = Router({ mergeParams: true })
const favoriteController = new FavoriteController()

favoriteRouter.get('/', ensureAuthenticated, favoriteController.index)
favoriteRouter.post('/', ensureAuthenticated, favoriteController.create)
favoriteRouter.delete(
  '/:bookId',
  ensureAuthenticated,
  favoriteController.delete,
)

export default favoriteRouter
