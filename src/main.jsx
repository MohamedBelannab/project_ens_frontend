import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './slices/store.js'
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from "primereact/passthrough/tailwind";
import { twMerge } from "tailwind-merge";
ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
  <PrimeReactProvider value={{ unstyled: true, pt: Tailwind, ptOptions: { mergeSections: true, mergeProps: true, classNameMergeFunction: twMerge } }}>
     <App />
  </PrimeReactProvider>
 
 </Provider>
    
  ,
)
