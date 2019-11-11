const bcrypt = require('bcrypt')

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
      required: ['name', 'email', 'birthday', 'phone'],
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
            to: 'users_favorite_books.bookId'
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

  async hashPassword (password) {
    const rounds = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, rounds)

    return hash
  }

  async comparePassword (password) {
    const isPasswordRight = await bcrypt.compare(this.password, password)

    return isPasswordRight
  }

  async $beforeInsert (queryContext) {
    await super.$beforeInsert(queryContext)

    this.password = await this.hashPassword(this.password)
  }

  async $beforeUpdate (opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext)

    if (this.password) {
      this.password = await this.hashPassword(this.password)
    }
  }
}

module.exports = User
