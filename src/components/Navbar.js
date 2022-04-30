import React from 'react'
import {
    Link
} from "react-router-dom";


function Navbar() {
    return (
        <nav>
            <ul style={{ display: "flex", justifyContent: 'space-between' , listStyle:'none'}}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/addUser">Add User</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;