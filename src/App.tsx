import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './features/Home/Home'
import { PrivateOutlet } from './utils/PrivateOutlet'
import Login from './features/Login'
import Reviews from './features/Reviews'
import CreateAccount from './features/CreateAccount/CreateAccount'
import ForgotPassword from './features/ForgotPassword'
import Profile from './features/Profile/Profile'
import AddClam from './features/AddClam'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/test" element={<>hello</>} />
      <Route
        path="/clams-submit"
        element={
          <PrivateOutlet>
            <AddClam />
          </PrivateOutlet>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateOutlet>
            <Profile />
          </PrivateOutlet>
        }
      />
      <Route path="/clams" element={<Reviews />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  )
}

export default App
