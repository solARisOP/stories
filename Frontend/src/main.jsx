import { createRoot } from 'react-dom/client'
import Router from './Router.jsx'
import './index.css'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ToastContainer />
        <Router />
    </Provider>
)
