import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'

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
          <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b-2">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a
                href="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                {/* <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8"
                  alt="Flowbite Logo"
                /> */}
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-blue-400">
                  Clam Chowder Inn
                </span>
              </a>
            </div>
          </nav>
          <App />
        </>,
      ),
    )
} else {
  // Production
  root.render(<App />)
}
