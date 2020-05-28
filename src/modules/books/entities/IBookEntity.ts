import ICategoryEntity from './ICategoryEntity'

export default interface IBookEntity {
  id: number
  title: string
  year: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ISBN: string
  categories?: Array<ICategoryEntity>
}
