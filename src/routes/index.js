const { Router } = require('express')

const router = Router()
const userRoutes = require('./users')

router.get('/', (_req, res) => {
  res.json({ message: 'Hello' })
})

router.use('/users', userRoutes)

module.exports = router
