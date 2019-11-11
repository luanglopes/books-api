const { Router } = require('express')

const CategroyController = require('../controllers/CategoryController')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')
const { roles } = require('../constants/user')

class CategoryRouter {
  constructor () {
    this.router = new Router()
    this.controller = new CategroyController()

    this.routes()
  }

  routes () {
    this.router.get('/', this.controller.list)
    this.router.get('/:id', this.controller.getOne)
    this.router.post('/', authMiddleware, roleMiddleware(roles.admin, roles.librarian), this.controller.create)
    this.router.put('/:id', authMiddleware, roleMiddleware(roles.admin, roles.librarian), this.controller.update)
    this.router.delete('/:id', authMiddleware, roleMiddleware(roles.admin, roles.librarian), this.controller.delete)
    this.router.get('/:id/books', this.controller.listBooks)
  }
}

module.exports = new CategoryRouter().router
