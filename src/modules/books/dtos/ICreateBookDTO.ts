import IBookEntity from '../entities/IBookEntity'

export default interface ICreateBookDTO {
  title: IBookEntity['title']
  year: IBookEntity['year']
  ISBN: IBookEntity['ISBN']
}
