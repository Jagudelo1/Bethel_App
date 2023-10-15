import React, { useState } from "react";
import Button from 'react-bootstrap/Button'; // Bootstrap
import Form from 'react-bootstrap/Form'; // Bootstrap
import Row from 'react-bootstrap/Row'; // Bootstrap
import { Link, useNavigate } from "react-router-dom"; // React-Router-Dom
import { RiLockPasswordFill } from 'react-icons/ri'; // Icono para ver la contraseña
import Axios from 'axios';
import Swal from "sweetalert2"; // Alertas personalizadas
import '../../css/RegistroApp.css';

export function RegistroApp() {
    /// -----> Validación de Campos del formulario para Registrarse <----- ///
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }

        setValidated(true);
    };

    // ----------> Ver y Ocultar Contraseña <---------- //
    const [ verContrasena, setVerContrasena ] = useState(false);

    const AlternarContrasenaVisibilidad = () =>{
        setVerContrasena(!verContrasena);
    };

    /// -----> Envió de Datos <----- ///
    const [ nombre, setNombre ] = useState()    
    const [ apellido, setApellido ] = useState()
    const [ correo, setCorreo ] = useState()
    const [ usuario, setUsuario ] = useState()
    const [ contrasena, setContrasena ] = useState()
    const navigate = useNavigate();

    const createAdmin = () => {
        Axios.post("http://localhost:3001/Enviar", {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            usuario: usuario,
            contrasena: contrasena
        }).then((response) => {
            if(response.data.success) {
                //Registro exitoso, muestra una alerta y luego redirige al login
                Swal.fire({
                    icon: 'success',
                    title: 'Administrador registrado exitosamente',
                    showConfirmButton: false,
                    timer: 1500 // Duración de la alerta en milisegundos
                }).then(() => {
                    navigate("/"); // Redirige al componente del Login cuando se cumple los 1500 milisegundos
                });
            } else{
                // Alerta de Error al registrar (usuario o correo ya están registrado)
                if (response.data.message === "El usuario o correo ya se encuentran registrados") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'El usuario o correo ya se encuentran registrados',
                        confirmButtonText: 'OK'
                    });
                } else {
                    alert(response.data.message);
                }
            }
        });
    }

    return(
        <div className="ContentFormRegister">
            <h2>Registrar Administrador</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3 Row">
                    <Form.Group md="6">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            onChange={(event) => {
                                setNombre(event.target.value);
                            }}
                            required
                            type="text"
                            />
                        <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group md="6">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            onChange={(event) => {
                                setApellido(event.target.value);
                            }}
                            required
                            type="text"
                            />
                        <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group md="12">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control
                            onChange={(event) => {
                                setCorreo(event.target.value);
                            }}
                            required
                            type="email"
                            />
                        <Form.Control.Feedback type="invalid">Se ve bien!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3 Row">
                    <Form.Group md="6">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                            onChange={(event) => {
                                setUsuario(event.target.value);
                            }}
                            required
                            type="text"
                            />
                        <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group md="6">
                        <Form.Label>Contraseña</Form.Label>
                        <RiLockPasswordFill 
                            size={20}
                            className="IconPasswordR"
                            onClick={AlternarContrasenaVisibilidad}/>
                        <Form.Control
                            onChange={(event) => {
                                setContrasena(event.target.value);
                            }}
                            required
                            type={verContrasena ? 'text' : 'password'}
                            />
                        <Form.Control.Feedback>Se ve bien!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group md="6">
                        <Form.Check
                            required
                            label="Aceptar Términos y Condiciones"
                            feedback="Debes aceptar antes de enviar."
                            feedbackType="invalid"
                        />
                    </Form.Group>
                </Row>
                <Button 
                    className="ButtonRegister"
                    onClick={createAdmin}
                >
                    Registrar
                </Button>
                <p className="Message">¿Ya tienes cuenta? 
                    <Link to='/' className="LinkLogin"> Inicia Sesión</Link>
                </p>
            </Form>
        </div>
    )
}