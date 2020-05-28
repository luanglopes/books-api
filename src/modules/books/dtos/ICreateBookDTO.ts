import IBookEntity from '../entities/IBookEntity'

export default interface ICreateBookDTO {
  title: IBookEntity['title']
  year: IBookEntity['year']
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ISBN: IBookEntity['ISBN']
}
