import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import Dashboard from '../Pages/Dashboard'
import AddReminder from '../Pages/AddReminder'
import AddedReminders from '../Pages/AddedReminders'
import UpcomingReminders from '../Pages/UpcomingReminders'

const AppRoutes = () => {
  return (
    <div>
       <Router>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/dashboard' element={<Dashboard/>} />
                <Route path='/add-reminder' element={<AddReminder/>} />
                <Route path='/added-reminders' element={<AddedReminders/>} />
                <Route path='/upcoming-reminders' element={<UpcomingReminders/>} />
            </Routes>
       </Router>
    </div>
  )
}

export default AppRoutes
