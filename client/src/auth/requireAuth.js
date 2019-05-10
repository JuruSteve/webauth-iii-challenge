import React from 'react'
import axios from 'axios'

axios.interceptors.request.use(
  function (config) {
    config.headers.authorization = localStorage.getItem('token')
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default function (Component) {
  return class Authenticated extends React.Component {
    render () {
      const token = localStorage.getItem('token')
      const noToken = 'Please Login First'
      return <>{token ? <Component {...this.props} /> : noToken }</>
    }
  }
}
