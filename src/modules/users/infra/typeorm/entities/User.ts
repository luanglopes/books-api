import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm'

import EUserRoles from '@modules/users/enums/EUserRoles'
import Book from '@modules/books/infra/typeorm/entities/Book'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'date' })
  birthday: Date

  @Column()
  phone: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: Object.values(EUserRoles),
    default: EUserRoles.user,
  })
  role: EUserRoles

  @ManyToMany(() => Book, { cascade: true })
  @JoinTable({
    name: 'user_favorite_books',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'book_id', referencedColumnName: 'id' },
  })
  favoriteBooks: Array<Book>
}
