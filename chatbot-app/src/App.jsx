import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './components/logins/Login';
import Register from './components/logins/Register';
import UserData from './components/logins/UserData';
import Home from './components/home/Home';
function App() {

  return (
<Router>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/userdata" element={<UserData/>} />
      <Route path="/dashboard" element={<Home/>}/>
    </Routes>
  </Router>
  )};
export default App;