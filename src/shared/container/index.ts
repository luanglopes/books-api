import { container } from 'tsyringe'

// users module providers
import '@modules/users/providers'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import IBooksRepository from '@modules/books/repositories/IBooksRepository'
import BooksRepository from '@modules/books/infra/typeorm/repositories/BooksRepository'

// users module
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

// books module
container.registerSingleton<IBooksRepository>(
  'BooksRepository',
  BooksRepository,
)
