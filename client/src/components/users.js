import React, { Component } from 'react'
import axios from 'axios'
import requireAuth from '../auth/requireAuth'
class users extends Component {
    state = {
        users: []
    }
  componentDidMount() {
    axios.get('http://localhost:3300/api/users')
        .then(res=>{
            this.setState({users: res.data})
        })
  }
  
    render () {
    return (
      <div>
        <ul>
            {this.state.users.map((user)=>(
                <li key={user.id}>{user.username}</li>
            ))}
        </ul>
      </div>
    )
  }
}

export default requireAuth(users)
