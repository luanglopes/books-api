const { Model } = require('objection')
const { DBErrors } = require('objection-db-errors')
const visibilityPlugin = require('objection-visibility').default
const dayjs = require('dayjs')

module.exports = class BaseModel extends visibilityPlugin(DBErrors(Model)) {
  static get timestamps () {
    return true
  }

  $beforeInsert () {
    if (!this.constructor.timestamps) {
      return
    }

    const dateTime = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    this.createdAt = dateTime
    this.updatedAt = dateTime
  }

  $beforeUpdate () {
    if (!this.constructor.timestamps) {
      return
    }

    this.updatedAt = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    delete this.createdAt
  }
}
