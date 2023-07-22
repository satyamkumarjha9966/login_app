import React from "react";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

// Import all Components
import PageNotFound from "./components/PageNotFound";
import Password from "./components/Password";
import Profiles from "./components/Profile";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Username from "./components/Username";

// Auth Middleware
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";

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
        element : <ProtectRoute> <Password /> </ProtectRoute>
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
        element : <AuthorizeUser> <Profiles /> </AuthorizeUser>
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