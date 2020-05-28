import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm'

import Category from './Category'

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

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Array<Category>
}
