import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Link to ="/read">Read</Link>
    </div>
  )
}

export default App
