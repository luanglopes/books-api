'use strict'
const { Router } = require('express')

const User = require('../models/User')
const UserRepository = require('../repositories/UserRepository')
const AuthService = require('../services/AuthService')
const AuthController = require('../controllers/AuthController')

class AuthRouter {
  constructor () {
    this.router = new Router()

    const userRepository = new UserRepository(User)
    const authservice = new AuthService(userRepository)
    this.controller = new AuthController(authservice)

    this.routes()
  }

  routes () {
    this.router.post('/', this.controller.authenticate)
    this.router.post('/verify-token', this.controller.verifyToken)
  }
}

module.exports = new AuthRouter().router
