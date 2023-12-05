import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'
import NavBar from './features/NavBar/Navbar'

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
          <NavBar />
          <main className="pt-20">
            <App />
          </main>
        </>,
      ),
    )
} else {
  // Production
  root.render(<App />)
}
