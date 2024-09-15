import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { AuthProvider } from './Context';
import CreatePostPage from './pages/CreatePostPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,

    children:[

      {
        path: "/login",
        element: <LoginPage/>
      },

      {
        path: "/signup",
        element: <SignUpPage/>
      }, 

      {
        path: "/create-post",
        element: <CreatePostPage/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    
  </React.StrictMode>,
)
