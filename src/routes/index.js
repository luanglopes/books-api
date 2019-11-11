const { Router } = require('express')

const router = Router()
const userRoutes = require('./users')
const bookRoutes = require('./books')

router.get('/', (_req, res) => {
  res.json({ message: 'Hello' })
})

router.use('/users', userRoutes)
router.use('/books', bookRoutes)

module.exports = router
