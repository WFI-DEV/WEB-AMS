import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Layout
const MasterLayout = React.lazy(() => import('./layout/MasterLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" name="Login Page" element={<Login />} />
            <Route path="admin/*" name="Home" element={<MasterLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App