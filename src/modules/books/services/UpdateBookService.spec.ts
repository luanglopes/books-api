import AppError from '@shared/errors/AppError'
import UpdateBookService from './UpdateBookService'
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository'
import IBookEntity from '../entities/IBookEntity'

describe('UpdateBookService', () => {
  let updateBookService: UpdateBookService
  let fakeBooksRepository: FakeBooksRepository
  let testBook: IBookEntity

  beforeEach(async () => {
    fakeBooksRepository = new FakeBooksRepository()

    testBook = await fakeBooksRepository.create({
      ISBN: '12345678',
      title: 'Test Book',
      year: '2020',
    })

    updateBookService = new UpdateBookService(fakeBooksRepository)
  })

  it('should update a book with provided id and return updated book', async () => {
    const data = {
      ISBN: '123456789',
      title: 'Test Book Edit',
      year: '2021',
    }

    const result = await updateBookService.execute({ id: testBook.id, data })

    expect(result).toMatchObject(data)
  })

  it('should throw if no book with provided id is found', async () => {
    const data = {
      ISBN: '123456789',
      title: 'Test Book Edit',
      year: '2021',
    }

    await expect(
      updateBookService.execute({ id: 0, data }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
