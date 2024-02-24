import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ProductsPage from './views/ProductsPage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductsPage />
  </React.StrictMode>,
)
