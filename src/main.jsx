import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router";
import { router } from './Router/Routes.jsx';
import AuthProvider from './context/AuthContext/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';


// create query client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <div className='font-urbanist'>
   
   <QueryClientProvider client={queryClient}>
   <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position='top-right' />
    </AuthProvider>
   </QueryClientProvider>
  
    </div>
  </StrictMode>,
)
