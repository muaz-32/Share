import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

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
// TODO: while signing in if the user exists do not redirect to dashboard, show an error message
