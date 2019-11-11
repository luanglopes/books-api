const { Router } = require('express')

const router = Router()
const userRoutes = require('./users')
const bookRoutes = require('./books')
const categoryRoutes = require('./categories')

router.get('/', (_req, res) => {
  res.json({ message: 'Hello' })
})

router.use('/users', userRoutes)
router.use('/books', bookRoutes)
router.use('/categories', categoryRoutes)

module.exports = router
