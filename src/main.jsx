import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './pages/HomePage'
import Form from './pages/FormPage'
import App from './App'
import Success from './pages/Success'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/form",
            element: (
              <Form />
            ),
        },
        {
            path: "/success",
            element: (
              <Success />
            ),
        },
       
    ],
},
])

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    
    <RouterProvider router={router} />
  </StrictMode>,
)
