const BaseModel = require('./BaseModel')
const unique = require('objection-unique')({
  fields: ['email', 'phone']
})

class User extends unique(BaseModel) {
  static get tableName () {
    return 'users'
  }

  static get hidden () {
    return ['password']
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name', 'email', 'birthday'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 3, maxLength: 255 },
        email: { type: 'string', minLength: 3, maxLength: 255 },
        birthday: { type: 'date' },
        password: { type: 'string', minLength: 6 }
      }
    }
  }

  static get relationMappings () {
    const Book = require('./Book')

    return {
      favoriteBooks: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: 'users.id',
          through: {
            from: 'users_favorite_books.userId',
            to: 'user_favorite_books.bookId'
          },
          to: 'books.id'
        }
      }
    }
  }

  age () {
    console.log(this.birthday)
    // const birthdayDate = new Date(this.birthday)
    // const ageDifMs = Date.now() - birthdayDate.getTime()
    // const ageDate = new Date(ageDifMs)
    return 10 // Math.abs(ageDate.getUTCFullYear() - 1970)
  }
}

module.exports = User
