import React, { useState } from "react";
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../../css/LoginRegister.css';

export function RegisterApp() {
    // <---------- Ver y Ocultar Contraseña ----------> //
    const [ verContrasena, setVerContrasena ] = useState(false);

    const AlternarContrasenaVisibilidad = () =>{
        setVerContrasena(!verContrasena);
    };

    // <---------- Enviar datos ----------> //
    const [ nombre, setNombre ] = useState()    
    const [ apellido, setApellido ] = useState()
    const [ correo, setCorreo ] = useState()
    const [ usuario, setUsuario ] = useState()
    const [ contrasena, setContrasena ] = useState()

    const navigated = useNavigate();

    const add = () => {
        Axios.post("http://localhost:3001/enviar", {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            usuario: usuario,
            contrasena: contrasena
        }).then((response) => {
            if (response.data.success) {
                // Registro exitoso, muestra una alerta y luego redirige
                Swal.fire({
                    icon: 'success',
                    title: 'Administrador registrado exitosamente',
                    showConfirmButton: false,
                    timer: 1500 // Duración de la alerta en milisegundos
                }).then(() => {
                    navigated("/Login"); // Redirige al componente de inicio de sesión
                });
            } else {
                // Error al registrar
                if (response.data.message === "El usuario o correo ya están registrados") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'El usuario o correo ya están registrados',
                        confirmButtonText: 'OK'
                    });
                } else {
                    alert(response.data.message);
                }
            }
        });
    }
    
    

    return(
        <div className="LoginRegister">
            <h2>Registrar Administrador</h2>
            <Form className="FormularioRegister">
                <Form.Group className="mb-3 Nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                        onChange={(event) =>{
                        setNombre(event.target.value);
                        }}
                        type="text" 
                        className="InputForm"
                        placeholder="Ingresa tu Nombre" />
                </Form.Group>
                <Form.Group className="mb-3 Apellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control 
                        onChange={(event) =>{
                        setApellido(event.target.value);
                        }}
                        type="text" 
                        className="InputForm" 
                        placeholder="Ingresa tu Apellido" />
                </Form.Group>
                <Form.Group className="mb-3 Correo">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control 
                        onChange={(event) =>{
                        setCorreo(event.target.value);
                        }}
                        type="email" 
                        className="InputForm" 
                        placeholder="Ingresa tu Correo Electrónico" />
                </Form.Group>
                <Form.Group className="mb-3 Usuario">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control 
                        onChange={(event) =>{
                        setUsuario(event.target.value);
                        }}
                        type="text" 
                        className="InputForm" 
                        placeholder="Usuario" />
                </Form.Group>
                <Form.Group className="mb-3 Contrasena">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        onChange={(event) =>{
                        setContrasena(event.target.value);
                        }}
                        type={verContrasena ? 'text' : 'password'} 
                        className="InputForm" 
                        placeholder="Contraseña" 
                    />
                    <RiLockPasswordFill 
                        className="iconPasswordCreate"
                        size={20} 
                        onClick={AlternarContrasenaVisibilidad}
                    />
                </Form.Group>
                <Button 
                    className="btn ButtonRegister"
                    onClick={add}>Registrar</Button>
            </Form>
            <p className="TextAccountRegister">Ya tienes una Cuenta
                <Link to='/Login'>Inicia Sesión</Link>
            </p>
        </div>
    )
}