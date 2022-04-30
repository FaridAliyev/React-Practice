import React, { Component } from 'react';
import './App.css';
import Users from './components/Users';
import AddUser from './components/AddUser';
import Navbar from './components/Navbar';
import UpdateUser from './components/UpdateUser';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


const NotFound = () => {
  return (
    <h3>Not Found</h3>
  )
}

class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <div className='container'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Users />} />
            <Route path='/addUser' element={<AddUser />} />
            <Route path='/updateUser/:id' element={<UpdateUser/>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>


    )
  }
}



export default App;
