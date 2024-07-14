import React from 'react';
import Auth from './components/Auth';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from "./components/Dashboard.tsx";
import Post from "./components/Post.tsx";
import Create from "./components/Create.tsx";
import Domains from "./components/Domains.tsx";

function App(): React.ReactElement {
    const router = createBrowserRouter([
        {
            path: "/dashboard",
            element: <Dashboard />
        },
        {
            path: "/authorize",
            element: <Auth />
        },
        {
            path: "/post/:id",
            element: <Post />
        },
        {
            path: "/create",
            element: <Create />
        },
        {
            path: "/domains",
            element: <Domains />
        }
    ])

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
