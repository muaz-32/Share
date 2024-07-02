import React from 'react';
import Auth from './components/Auth';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from "./components/Dashboard.tsx";

function App(): React.ReactElement {
  const router = createBrowserRouter([
      {
          path: "/dashboard",
          element: <Dashboard />
      },
      {
          path: "/authorize",
          element: <Auth />
      }
  ])

  return (
    <>
        <RouterProvider router={router} />
    </>
  );
}

export default App;
