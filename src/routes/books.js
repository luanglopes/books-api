const { Router } = require('express')

const BookController = require('../controllers/BookController')

class BookRouter {
  constructor () {
    this.router = new Router()
    this.controller = new BookController()

    this.routes()
  }

  routes () {
    this.router.get('/', this.controller.list)
    this.router.get('/:id', this.controller.getOne)
    this.router.post('/', this.controller.create)
    this.router.put('/:id', this.controller.update)
    this.router.delete('/:id', this.controller.delete)
  }
}

module.exports = new BookRouter().router
