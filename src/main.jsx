import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Aos from 'aos'
import "aos/dist/aos.css"
import { Provider } from 'react-redux'
import { store } from './slices/store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
     <App />
 </Provider>
    
  ,
)
Aos.init()