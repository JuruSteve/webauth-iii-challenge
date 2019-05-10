const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../users/users-model')
const secrets = require('../config/secrets')

router.post('/register', async (req, res) => {
  try {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash
    const users = await Users.addUser(user)
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

router.post('/login', async (req, res) => {
  try {
    let { username, password } = req.body
    const user = await Users.findBy({ username }).first()
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user)
      res.status(200).json({ message: `Welcome ${user.username}`, token })
    } else {
      res.status(401).json({ message: `You shall not pass!` })
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

function generateToken (user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  }

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router
