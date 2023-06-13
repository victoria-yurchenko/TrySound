import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddForm from './AddForm'
import Arts from './Arts'
import About from './About'
import Login from './Login'

export default function AppRouter({ pattern }) {
    return (
        <div>
            <p>pattern: {pattern}</p>
            <BrowserRouter>
                <Routes>
                    <Route path='/arts' element={<Arts pattern={pattern} />} />
                    <Route path='/addart' element={<AddForm />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
