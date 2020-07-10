import AppError from '@shared/errors/AppError'
import ListUserFavoriteBooksService from './ListUserFavoriteBooksService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

describe('UpdateUserService', () => {
  let fakeUsersRepository: FakeUsersRepository
  let listUserFavoriteBooksService: ListUserFavoriteBooksService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    listUserFavoriteBooksService = new ListUserFavoriteBooksService(
      fakeUsersRepository,
    )
  })

  it('should return an array with favorite books of user with provided id using users repository', async () => {
    const findByIdSpy = jest.spyOn(fakeUsersRepository, 'findById')

    const user = await fakeUsersRepository.create({
      birthday: new Date(),
      email: 'jon@email.com',
      name: 'Jon Doe',
      password: 'fake-password',
      phone: '99999999',
    })

    const result = await listUserFavoriteBooksService.execute(user.id)

    expect(result).toBeInstanceOf(Array)
    expect(findByIdSpy).toHaveBeenCalledWith(user.id, {
      relations: ['favoriteBooks'],
    })
  })

  it('should thorw if no user is found provided id', async () => {
    await expect(
      listUserFavoriteBooksService.execute(1),
    ).rejects.toBeInstanceOf(AppError)
  })
})
