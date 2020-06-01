import { Router } from 'express'

import usersRouter from './users.router'
import authRouter from './auth.router'
import favoritesRouter from './favorites.router'

const router = Router()

router.use('/users', usersRouter)
router.use('/auth', authRouter)
router.use('/favorite-books', favoritesRouter)

export default router
