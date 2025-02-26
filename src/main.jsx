import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router'
import './index.css'
import App from './App.jsx'

import Dashboard from './pages/dashboard'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import PasswordReset from './pages/PasswordReset'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index element={<Navigate to="./login" replace />} />
                <Route path="app" element={<App />}>
                    <Route index element={<Navigate to="./dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard/>} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="password-reset" element={<PasswordReset />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
