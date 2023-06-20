import React from 'react'
import { NavLink } from 'react-router-dom'
//import { useState } from 'react';

export default function Navbar({ pattern }) {

    //const [keyword, setKeyword] = useState("");

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="w-100 d-flex justify-content-between">
                <NavLink to='/' className="navbar-brand btn btn-outline-info">Arts</NavLink>
                <NavLink to='/addart' className="navbar-brand btn btn-outline-info">Add Art</NavLink>
                <NavLink to='/about' className="navbar-brand btn btn-outline-info">About</NavLink>
                <input className="form-control w-25" onChange={(e) => pattern(e.target.value.toLowerCase())} type="search" placeholder="Search" aria-label="Search" />
                <NavLink to='/login' className="navbar-brand btn btn-outline-info">Login</NavLink>
                {/* <form className="d-flex" onSubmit={() => pattern(keyword)}>
                    <input className="form-control me-2" onChange={(e) => setKeyword(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form> */}
            </div>
        </nav>
    )
}
