import React from "react";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

export function RegisterApp() {
    return(
        <div className="LoginRegister">
            <Form className="FormularioRegister">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" className="InputForm" placeholder="Ingresa tu Nombre" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" className="InputForm" placeholder="Ingresa tu Apellido" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="email" className="InputForm" placeholder="Ingresa tu Correo Electronico" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" className="InputForm" placeholder="Digita una Contraseña" />
                </Form.Group>
            </Form>
            <p className="TextAccount">Ya tienes una Cuenta
                <Link to='/Login'>Inicia Sesión</Link>
            </p>
        </div>
    )
}