import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// TODO: connecting Zod
// TODO: correcting the use of react-hook-form
// TODO: using RTK query instead of axios
// TODO: handling errors in the form
// TODO: correcting import for shadcn-ui
// TODO: deleting unnecessary packages
// TODO: handling the expiration of the token
// TODO: storing the cookies safely and securely
// TODO: when a logged in user tries to access the login page, redirect to the dashboard, the login page should not be rendered
