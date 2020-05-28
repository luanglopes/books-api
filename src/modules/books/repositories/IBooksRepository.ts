import IBookEntity from '../entities/IBookEntity'
import IPageParamsDTO from '../dtos/IPageParamsDTO'
import ICreateBookDTO from '../dtos/ICreateBookDTO'

export default interface IBooksRepository {
  list(params: IPageParamsDTO): Promise<Array<IBookEntity>>

  getOne(id: number): Promise<IBookEntity | undefined>

  create(data: ICreateBookDTO): Promise<IBookEntity>

  update(book: IBookEntity): Promise<IBookEntity>

  delete(id: number): Promise<void>
}
