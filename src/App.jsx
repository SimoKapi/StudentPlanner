import './App.css'
import { Routes, Route, Outlet } from "react-router";
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import authenticator from './main/authenticator';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Sidebar from './components/sidebar'

function App() {
  const navigate = useNavigate()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState(null)

  function handleScroll(event) {
    setScrollPosition(event.target.scrollTop)
  }
  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen)
  }

  function logout() {
    authenticator.logout()
  }

  function refreshUser(updatedUser) {
    setUser(updatedUser ? { ...updatedUser } : null)
  }

  useEffect(() => {
      const auth = getAuth()
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (!user) navigate("../login")
          setUser(user)
      })
      return () => unsubscribe()
  })
  if (user) return (
    <div className="flex flex-row overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} logout={logout} user={user}/>
      <div className="p-3 w-full h-screen overflow-y-scroll" onScroll={handleScroll}>
        <Outlet scrollPosition={scrollPosition} context={{user, refreshUser}}/>
      </div>
    </div>
  )
  else return null
}

export default App
