import React from "react";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

// Import all Components
import PageNotFound from "./components/PageNotFound";
import Password from "./components/Password";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Username from "./components/Username";

// Root Routes
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <Password></Password>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/profile',
        element : <Profile></Profile>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
])

export default function App() {
    return(
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    )
}