const bcrypt = require('bcrypt')
const dayjs = require('dayjs')

const { roles } = require('../src/constants/user')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      const password = bcrypt.hashSync('123456', 10)

      const dateTime = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')

      return knex('users').insert({
        id: 1,
        name: 'Administrador',
        email: 'admin@example.com',
        birthday: '1998-08-17',
        phone: '51999999999',
        password,
        role: roles.admin,
        created_at: dateTime,
        updated_at: dateTime,
      })
    })
}
