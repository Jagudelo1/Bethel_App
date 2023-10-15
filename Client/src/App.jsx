import React from "react";
import { Routes, Route } from 'react-router-dom';
import { HomeApp } from "./components/HomeApp";
import { RegistroApp } from "./components/RegistroApp/RegistroApp";
import { FacturaApp } from "./components/FacturaApp/FacturaApp";
import { FacturaImp } from "./components/FacturaApp/FacturaImp";
import { VerFacturas } from "./components/FacturaApp/VerFacturas";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeApp/>}/>
        <Route path="/Registro" element={<RegistroApp/>}/>
        <Route path="/Facturacion" element={<FacturaApp/>}/>
        <Route path="/FacturaImp" element={<FacturaImp/>}/>
        <Route path="/FacturasCreadas" element={<VerFacturas/>}/>
      </Routes>
    </>
  )
}

export default App