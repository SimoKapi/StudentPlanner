import './App.css'
import { Routes, Route, Outlet } from "react-router";
import { useState } from 'react';

import Sidebar from './components/sidebar'

function App() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleScroll(event) {
    setScrollPosition(event.target.scrollTop)
  }
  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex flex-row overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
      <div className="p-3 w-full h-screen overflow-y-scroll" onScroll={handleScroll}>
        <Outlet scrollPosition={scrollPosition}/>
      </div>
    </div>
  )
}

export default App
