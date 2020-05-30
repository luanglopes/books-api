import { Router } from 'express'

import booksRouter from '@modules/books/infra/http/routes'
import usersRouter from '@modules/users/infra/http/routes'

const appRouter = Router()

appRouter.use(booksRouter)
appRouter.use(usersRouter)

appRouter.get('/', (_req, res) => {
  return res.json({ message: 'Hello from API' })
})

export default appRouter
