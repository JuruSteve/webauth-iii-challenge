import React from 'react'
import Login from './components/Login'
import { Route, NavLink } from 'react-router-dom'
import './App.css'
import users from './components/users'

function App () {
  const logout = () => {
    localStorage.removeItem('token')
  }
  return (
    <div className='App'>
      <div>
        <nav>
          <NavLink to='/'>
      Home
          </NavLink>
          <div />
          <NavLink to='/users'>
      Users
          </NavLink>
          <button onClick={logout}>Logout</button>
        </nav>
      </div>
      <Route exact path='/' component={Login} />
      <Route exact path='/users' component={users} />
    </div>
  )
}

export default App
