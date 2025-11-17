import { createRoot } from 'react-dom/client'
import {
  RouterProvider
} from "react-router-dom";

import './index.css'
import { router } from '@/core/providers/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './core/providers/query';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>

    </RouterProvider>
  </QueryClientProvider>
)
