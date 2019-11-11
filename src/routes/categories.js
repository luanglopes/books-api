const { Router } = require('express')

const CategroyController = require('../controllers/CategoryController')

class CategoryRouter {
  constructor () {
    this.router = new Router()
    this.controller = new CategroyController()

    this.routes()
  }

  routes () {
    this.router.get('/', this.controller.list)
    this.router.get('/:id', this.controller.getOne)
    this.router.post('/', this.controller.create)
    this.router.put('/:id', this.controller.update)
    this.router.delete('/:id', this.controller.delete)
    this.router.get('/:id/books', this.controller.listBooks)
  }
}

module.exports = new CategoryRouter().router
