import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import { HomeApp } from './components/HomeApp';
import { RegisterApp } from './components/RegisterApp/RegisterApp';
import { LoginApp } from './components/LoginApp/LoginApp';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomeApp/>}/>
        <Route path='/Registrate' element={<RegisterApp/>}/>
        <Route path='/Login' element={<LoginApp/>}/>
      </Routes>
    </>
  )
}

export default App
