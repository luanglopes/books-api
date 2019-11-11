const BaseModel = require('./BaseModel')

class Catgeory extends BaseModel {
  static get tableName () {
    return 'categories'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      requied: ['name'],
      properties: {
        id: { type: 'number' },
        name: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }

  static get relationMappings () {
    const Book = require('./Book')

    return {
      books: {
        relation: BaseModel.HasManyRelation,
        modelClass: Book,
        join: {
          from: 'categories.id',
          to: 'books.categoryId'
        }
      }
    }
  }
}

module.exports = Catgeory
