import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from './providers/ContextProvider.tsx'
import MainLayout from './layouts/MainLayout.tsx'
import QueryProvider from './providers/QueryProvider.tsx'

ReactDOM.createRoot(document.getElementById('seichats-widget')!).render(
  <React.StrictMode>
    <QueryProvider>
      <Provider>
        <MainLayout />
      </Provider>
    </QueryProvider>
  </React.StrictMode>
)
