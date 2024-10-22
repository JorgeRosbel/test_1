import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const clinet = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={clinet}>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>,
)
