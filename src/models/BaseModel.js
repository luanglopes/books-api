const { Model } = require('objection')
const { DBErrors } = require('objection-db-errors')
const visibilityPlugin = require('objection-visibility').default

module.exports = class BaseModel extends visibilityPlugin(DBErrors(Model)) { }
