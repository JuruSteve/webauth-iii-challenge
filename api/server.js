const express = require('express')
const helmet = require('helmet')
const server = express()
const usersRouter = require('./router/users-router')
const authRouter = require('./auth/auth-router')

server.use(express.json())
server.use(helmet())
server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
  const username = req.session.username || 'stranger'
  res.send(`Welcome ${username}`)
})

server.get('/logout', (req, res) => {
  req.session.destroy()
  res.send('You\'re logged out')
})

module.exports = server
