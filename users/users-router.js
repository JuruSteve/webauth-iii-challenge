const express = require('express')
const router = express.Router()
const Users = require('./users-model')
const protectedRoute = require('../auth/restricted-middleware')

router.get('/', protectedRoute, checkDepartment('sales'), async (req, res) => {
  try {
    const users = await Users.getUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'We ran into an error retrieving the dishes' })
  }
})

router.delete('/:id', protectedRoute, async (req, res) => {
  try {
    const user = await Users.deleteUser(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'We cannot delete this user' })
  }
})

function checkDepartment (dpt) {
  return function (req, res, next) {
    if (req.decodedToken && req.decodedToken.department && req.decodedToken.department === dpt) {
      next()
    } else {
      res.status(403).json({ message: 'Not authorized to access to these resources' })
    }
  }
}

module.exports = router
