import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from 'react-icons/ri';
import axios from 'axios';
import '../../css/LoginRegister.css'
import Swal from "sweetalert2";

export function LoginApp() {
    // <----- Ver y Ocultar Contraseña -----> //
    const [ verContrasena, setVerContrasena ] = useState(false);

    const AlternarContrasenaVisibilidad = () =>{
        setVerContrasena(!verContrasena);
    };

    const [ login, setLogin ] = useState({ usuario: '', contrasena: '' })
    const navigate = useNavigate();
    
    const inputChange = ({ target }) => {
        const {name, value} = target
        setLogin({
            ...login,
            [name]: value
        })
    }

    const onSubmit = () => {
        axios.post("http://localhost:3001/entrar", login)
          .then(({ data }) => {
            // Comprueba si el servidor ha devuelto un mensaje de éxito
            if (data) {
              // Muestra una alerta de éxito
              Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: '¡Bienvenido!',
                confirmButtonText: 'Continuar'
              }).then((result) => {
                if (result.isConfirmed) {
                  // Redirige a la ruta "/Facturar"
                  window.location.href = '/Facturar';
                }
              });
            } else {
              // Muestra una alerta de error
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario no encontrado',
                confirmButtonText: 'OK'
              });
            }
          })
          .catch(({ response }) => {
            // Muestra una alerta de error genérica en caso de fallo en la solicitud
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Usuario o Contrasñea Incorrecta',
              confirmButtonText: 'OK'
            });
          });
    };

    return(
        <div className="LoginRegister">
            <h2>Iniciar Sesión</h2>
            <Form className="FormularioLogin">
                <Form.Group className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control 
                        value={login.usuario}
                        type="text" 
                        className="InputForm" 
                        placeholder="Ingresa tu Usuario"
                        onChange={inputChange}
                        name="usuario"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        value={login.contrasena}
                        type={verContrasena ? 'text' : 'password'} 
                        className="InputForm" 
                        placeholder="Ingresa tu Contraseña"
                        onChange={inputChange} 
                        name="contrasena"
                    />
                    <RiLockPasswordFill 
                        className="iconPassword"
                        size={20} 
                        onClick={AlternarContrasenaVisibilidad}
                    />
                </Form.Group>
                <Button 
                    className="btn ButtonLogin" 
                    onClick={onSubmit}
                >
                    Ingresar
                </Button>
            </Form>
            <p className="TextAccount">No tienes cuenta 
                <Link to='/Registrate'>Regístrate</Link>
            </p>
        </div>
    )
}