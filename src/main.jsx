import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './pages/HomePage'
import Form from './pages/FormPage'
import App from './App'
import Success from './pages/Success'
import FormPage from './pages/FormPage'
import HomePage from './pages/HomePage'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/form",
            element: (
              <FormPage />
            ),
        },
        {
          path: "/success",
          element:(
            <Success />
          )
        }
        
       
    ],
},
])

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    
    <RouterProvider router={router} />
  </StrictMode>,
)