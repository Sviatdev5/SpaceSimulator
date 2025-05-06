import React from "react"
import ReactDOM from 'react-dom/client';
import App from './App'
import { AuthProvider } from './context/AuthContext';
import './css/main.css'

const app = ReactDOM.createRoot(document.getElementById("app"))
app.render(<AuthProvider>
    <App />
  </AuthProvider>);

