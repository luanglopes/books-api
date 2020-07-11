import AppError from '@shared/errors/AppError'
import ShowBookService from './ShowBookService'
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository'
import IBookEntity from '../entities/IBookEntity'

describe('ShowBookService', () => {
  let showBookService: ShowBookService
  let fakeBooksRepository: FakeBooksRepository
  let testBook: IBookEntity

  beforeEach(async () => {
    fakeBooksRepository = new FakeBooksRepository()

    testBook = await fakeBooksRepository.create({
      ISBN: '12345678',
      title: 'Test Book',
      year: '2020',
    })

    showBookService = new ShowBookService(fakeBooksRepository)
  })

  it('should return a book with provided id', async () => {
    const result = await showBookService.execute(testBook.id)

    expect(result).toMatchObject(testBook)
  })

  it('should throw if no book with provided id is found', async () => {
    await expect(showBookService.execute(0)).rejects.toBeInstanceOf(AppError)
  })
})
