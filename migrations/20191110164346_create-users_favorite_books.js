
exports.up = function (knex) {
  return knex.schema.createTable('users_favorite_books', table => {
    table.integer('user_id').unsigned().notNullable()
    table.integer('book_id').unsigned().notNullable()
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.foreign('book_id').references('id').inTable('books').onDelete('CASCADE')
    table.primary(['user_id', 'book_id'])
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users_favorite_books')
}
