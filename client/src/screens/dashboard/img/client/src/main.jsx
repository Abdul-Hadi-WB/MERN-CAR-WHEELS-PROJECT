import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/custom.css'
import Pixel from './Pixel.jsx'


import { Provider } from 'react-redux'
import store from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <Provider  store={store}>
    <Pixel />
  </Provider>,
)