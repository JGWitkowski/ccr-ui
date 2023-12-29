import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import NavBar from './features/NavBar/Navbar'
import { Provider as ReduxStoreProvider } from 'react-redux'
import { store } from './store'
const root = ReactDOM.createRoot(document.getElementById('root')!)

if (process.env.NODE_ENV === 'development') {
  // Prepare MSW in a Service Worker
  import('../mocks/browser')
    .then(({ worker }) => {
      worker.start()
    })
    // Launched mock server, and then start client React app
    .then(() =>
      root.render(
        <>
          <ReduxStoreProvider store={store}>
            <BrowserRouter>
              <NavBar />
              <main className="pt-16">
                <App />
              </main>
            </BrowserRouter>
          </ReduxStoreProvider>
        </>,
      ),
    )
} else {
  // Production
  root.render(
    <>
      <ReduxStoreProvider store={store}>
        <BrowserRouter>
          <NavBar />
          <main className="pt-16">
            <App />
          </main>
        </BrowserRouter>
      </ReduxStoreProvider>
    </>,
  )
}
