import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link } from "react-router-dom";
import '../../css/LoginRegister.css';

export function RegisterApp() {
    const [ verContrasena, setVerContrasena ] = useState(false);

    const AlternarContrasenaVisibilidad = () =>{
        setVerContrasena(!verContrasena);
    };

    return(
        <div className="LoginRegister">
            <h2>Registrar Administrador</h2>
            <Form className="FormularioRegister">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                        type="text" 
                        className="InputForm"
                        placeholder="Ingresa tu Nombre" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control 
                        type="text" 
                        className="InputForm" 
                        placeholder="Ingresa tu Apellido" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control 
                        type="email" 
                        className="InputForm" 
                        placeholder="Ingresa tu Correo Electrónico" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type={verContrasena ? 'text' : 'password'} 
                        className="InputForm" 
                        placeholder="Ingresa tu Contraseña" 
                    />
                    <RiLockPasswordFill 
                        className="iconPasswordCreate"
                        size={20} 
                        onClick={AlternarContrasenaVisibilidad}
                    />
                </Form.Group>
                <Button className="btn ButtonRegister">Registrar</Button>
            </Form>
            <p className="TextAccountRegister">Ya tienes una Cuenta
                <Link to='/Login'>Inicia Sesión</Link>
            </p>
        </div>
    )
}