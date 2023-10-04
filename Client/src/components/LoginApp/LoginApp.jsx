import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { RiLockPasswordFill } from 'react-icons/ri';
import '../../css/LoginRegister.css'

export function LoginApp() {
    const [ verContrasena, setVerContrasena ] = useState(false);

    const AlternarContrasenaVisibilidad = () =>{
        setVerContrasena(!verContrasena);
    };

    return(
        <div className="LoginRegister">
            <h2>Iniciar Sesión</h2>
            <Form className="FormularioLogin">
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control 
                        type="text" 
                        className="InputForm" 
                        placeholder="Ingresa tu Usuario" 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type={verContrasena ? 'text' : 'password'} 
                        className="InputForm" 
                        placeholder="Ingresa tu Contraseña" 
                    />
                    <RiLockPasswordFill 
                        className="iconPassword"
                        size={20} 
                        onClick={AlternarContrasenaVisibilidad}
                    />
                </Form.Group>
                <Button className="btn ButtonLogin">Ingresar</Button>
            </Form>
            <p className="TextAccount">No tienes cuenta 
                <Link to='/Registrate'>Regístrate</Link>
            </p>
        </div>
    )
}