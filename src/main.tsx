import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from './ContextProvider.tsx'
import MainLayout from './layouts/MainLayout.tsx'

ReactDOM.createRoot(document.getElementById('seichats-widget')!).render(
  <React.StrictMode>
    <Provider>
      <MainLayout />
    </Provider>
  </React.StrictMode>
)
