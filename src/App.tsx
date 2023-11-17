import React from 'react'
import { Provider as ReduxStoreProvider } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Login from './features/Login'
import DocumentList from './features/DocumentList'
import { store } from './store'
import Home from './features/Home/Home'
import ClamsList from './features/ClamsList'
import Clams from './features/Clams'

const App: React.FC = () => {
  return (
    <ReduxStoreProvider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clams-submit" element={<Clams />} />
        <Route path="/clams" element={<ClamsList />} />
      </Routes>
    </ReduxStoreProvider>
  )
}

export default App
