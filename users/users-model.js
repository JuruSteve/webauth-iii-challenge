const db = require('../data/dbConfig')

module.exports = {
  getUsers,
  addUser,
  findBy,
  find,
  deleteUser
}

function getUsers () {
  return db('users')
}

function addUser (user) {
  console.log('model', user)
  return db('users').insert(user)
}

function findBy (user) {
  return db('users').select('*').where('username', '=', user.username)
}

function find () {
  return db('users')
}

function deleteUser (id) {
  return db('users').where({ id }).delete()
}
