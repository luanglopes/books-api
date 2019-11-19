const { Router } = require('express')

const Book = require('../models/Book')
const BookRepository = require('../repositories/BookRepository')
const BookService = require('../services/BookService')
const BookController = require('../controllers/BookController')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')
const { roles } = require('../constants/user')

class BookRouter {
  constructor () {
    this.router = new Router()

    const bookRepository = new BookRepository(Book)
    const bookService = new BookService(bookRepository)
    this.controller = new BookController(bookService)

    this.routes()
  }

  routes () {
    this.router.get('/', this.controller.list)
    this.router.get('/:id', this.controller.getOne)
    this.router.post('/', authMiddleware, roleMiddleware(roles.admin, roles.librarian), this.controller.create)
    this.router.put('/:id', authMiddleware, roleMiddleware(roles.admin, roles.librarian), this.controller.update)
    this.router.delete('/:id', authMiddleware, roleMiddleware(roles.admin, roles.librarian), this.controller.delete)
  }
}

module.exports = new BookRouter().router
