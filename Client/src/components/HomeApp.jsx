import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";
import { BiSolidUserCircle } from 'react-icons/bi'; //Icono de usuario
import { RiLockPasswordFill } from 'react-icons/ri'; // Icono de contraseña
import { PiPasswordFill } from 'react-icons/pi'; // Icono para ver la contraseña
import '../css/HomeApp.css';
import Axios from 'axios';
import Swal from "sweetalert2";

export function HomeApp(){
    // -----> *Pantalla de Carga...* <----- //
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    // -----> *Script para mostrar y ocultar la contraseña* <----- //
    const [ password, setPassword ] = useState(false);
    const VisibilityPassword = () => {
        setPassword(!password);
    };

    // -----> *Inicio de sesión* <----- //
    const [ login, setLogin ] = useState({ usuario: '', contrasena: '' })
    const navigacion = useNavigate();

    const  inputChange = ({ target }) => {
        const { name, value } = target
        setLogin({
            ...login,
            [name]: value
        });
    }

    const loginSubmit = () => {
        Axios.post("http://localhost:3001/Entrar", login)
            .then(({ data }) => {
                // Comprueba si el servidor ha devuelto un mensaje éxito
                if(data) {
                    // Almacena los datos del administrador en sessionStorage
                    sessionStorage.setItem("adminData", JSON.stringify(data));
                    // Muestra una alerta de éxito
                    Swal.fire({
                        icon: 'success',
                        title: 'Inicio de sesión exitoso',
                        showConfirmButton: false,
                        timer: 1500
                    }).then((result) => {
                        navigacion("/Facturacion");
                    });
                } else {
                    // Se muestra una alerta de error
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
                    text: 'Usuario o Contraseña Incorrecta',
                    confirmButtonText: 'OK'
                });
            });
    };

    return(
        <div>
            {loading ? (
                <div className="loading-screen">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="ContainerHomeApp">
                    <h2>Iniciar Sesión</h2>
                    <Form className="FormLogin">
                        <Form.Group className="mb-3">
                            <Form.Label><BiSolidUserCircle size={25}/> Usuario</Form.Label>
                            <Form.Control 
                                type="text"
                                name="usuario"
                                value={login.usuario}
                                onChange={inputChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><RiLockPasswordFill size={25}/> Contraseña</Form.Label>
                            <Form.Control 
                                type={password ? 'text' : 'password'}
                                name="contrasena"
                                value={login.contrasena}
                                onChange={inputChange}
                                />
                            <PiPasswordFill 
                                className="IconPassword"
                                size={25}
                                onClick={VisibilityPassword}/>
                        </Form.Group>
                        <Button 
                            className="btn ButtonSesión"
                            onClick={loginSubmit}
                        >
                            Iniciar Sesión
                        </Button>
                    </Form>
                    <p>¿No tienes cuenta? 
                        <Link to='/Registro'> Regístrate</Link>
                    </p>
                </div>
            )}
        </div>
    )
}