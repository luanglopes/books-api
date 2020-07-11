import AppError from '@shared/errors/AppError'
import IBookEntity from '@modules/books/entities/IBookEntity'
import FakeBooksRepository from '@modules/books/repositories/fakes/FakeBooksRepository'
import AddUserFavoriteBookService from './AddUserFavoriteBookService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import IUserEntity from '../entities/IUserEntity'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

describe('AddUserFavoriteBookService', () => {
  let fakeUsersRepository: FakeUsersRepository
  let fakeBooksRepository: FakeBooksRepository
  let addUserFavoriteBookService: AddUserFavoriteBookService
  let testUser: IUserEntity
  let testBook: IBookEntity

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeBooksRepository = new FakeBooksRepository()

    const fakeHashProvider = new FakeHashProvider()

    testUser = await fakeUsersRepository.create({
      birthday: new Date(),
      email: 'jon@emial.com',
      name: 'Jon Doe',
      password: await fakeHashProvider.generateHash('password'),
      phone: '999999999',
    })

    testBook = await fakeBooksRepository.create({
      ISBN: '12345678',
      title: 'Test Book',
      year: '2020',
    })

    addUserFavoriteBookService = new AddUserFavoriteBookService(
      fakeUsersRepository,
      fakeBooksRepository,
    )
  })

  it('should add a book to user favorite books', async () => {
    await addUserFavoriteBookService.execute({
      bookId: testBook.id,
      userId: testUser.id,
    })

    const user = await fakeUsersRepository.findById(testUser.id)

    expect(user).toHaveProperty('favoriteBooks')
    expect(user.favoriteBooks).toHaveLength(1)
    expect(user.favoriteBooks).toContain(testBook)
  })

  it('should not add a book to user favorite books if no user with provided userId is found', async () => {
    await expect(
      addUserFavoriteBookService.execute({
        bookId: testBook.id,
        userId: 0,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not add a book to user favorite books if no user with provided userId is found', async () => {
    await expect(
      addUserFavoriteBookService.execute({
        bookId: 0,
        userId: testUser.id,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
