import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('books')
export default class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  year: string

  @Column()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ISBN: string
}
