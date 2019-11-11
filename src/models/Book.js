const BaseModel = require('./BaseModel')
const unique = require('objection-unique')({
  fields: ['ISBN']
})

class Book extends unique(BaseModel) {
  static get tableName () {
    return 'books'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['title', 'ISBN', 'year'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 3, maxLength: 255 },
        ISBN: { type: 'string', maxLength: 255 },
        year: { type: 'string', minLength: 4, maxLength: 4 }
      }
    }
  }

  static get relationMappings () {
    const Category = require('./Category')

    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'books.categoryId',
          to: 'categories.id'
        }
      }
    }
  }
}

module.exports = Book
