import React from 'react'
import { Provider as ReduxStoreProvider } from 'react-redux'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { store } from './store'
import Home from './features/Home/Home'
import ClamsList from './features/ClamsList'
import Clams from './features/Clams'
import { PrivateOutlet } from './utils/PrivateOutlet'
import Login from './features/Login'
import Reviews from './features/Reviews'

const App: React.FC = () => {
  return (
    <ReduxStoreProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/clams-submit"
            // element={
            //   <PrivateOutlet>
            //     <Clams />
            //   </PrivateOutlet>
            // }
            element={<Clams />}
          />
          <Route path="/clams" element={<Reviews />} />
        </Routes>
      </BrowserRouter>
    </ReduxStoreProvider>
  )
}

export default App
