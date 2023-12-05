import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import App from './App'

test('Show App Component', () => {
  render(<App />)

  expect(screen.getByText('Recent reviews')).toBeInTheDocument()
})

// test('working with msw', async () => {
//   const user = userEvent.setup()
// })
