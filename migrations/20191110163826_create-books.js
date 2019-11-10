
exports.up = function (knex) {
  return knex.schema.createTable('books', table => {
    table.increments()
    table.string('title').notNullable()
    table.string('year', 4).notNullable()
    table.string('ISBN').notNullable()
    table.integer('category_id').unsigned()
    table.foreign('category_id').references('id').inTable('categories').onDelete('SET NULL')
    table.timestamps()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('books')
}
