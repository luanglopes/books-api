const { roles, defaultRole } = require('../src/constants/user')

exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('name').notNullable()
    table.string('phone').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.enu('role', roles).defaultTo(defaultRole)
    table.timestamps()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
