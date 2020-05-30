import IPageParamsDTO from '@shared/dtos/IPageParamsDTO'
import IBookEntity from '../entities/IBookEntity'
import ICreateBookDTO from '../dtos/ICreateBookDTO'

export default interface IBooksRepository {
  list(params: IPageParamsDTO): Promise<Array<IBookEntity>>

  findById(id: IBookEntity['id']): Promise<IBookEntity | undefined>

  create(data: ICreateBookDTO): Promise<IBookEntity>

  update(book: IBookEntity): Promise<IBookEntity>

  delete(id: IBookEntity['id']): Promise<void>
}
