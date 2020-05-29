/* eslint-disable no-console */
import 'reflect-metadata'

import express, { NextFunction, Response, Request } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import 'express-async-errors'

import AppError from '@shared/errors/AppError'
import routes from './routes'

import '@shared/infra/typeorm'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)

app.use(async () => {
  throw new AppError('Endpoint Not Found', 404)
})

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ staus: 'error', message: err.message, details: err.details })
  }

  console.error(err)

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' })
})

const port = process.env.PORT || '3000'

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`)
})
