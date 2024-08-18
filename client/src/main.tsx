import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
)


// TODO: connecting Zod
// TODO: correcting the use of react-hook-form
// TODO: using RTK query instead of axios
// TODO: handling errors in the form
// TODO: correcting import for shadcn-ui
// TODO: storing the cookies safely and securely
// TODO: correcting the follow and unfollow button
