import { useState } from 'react';
import withReactContent from 'sweetalert2-react-content';
import { Link, useNavigate } from "react-router-dom";
import { BiSolidLogOut } from 'react-icons/bi';
import '../../css/FacturaApp.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export function FacturaApp() {
    const navegacion = useNavigate();
    
    // -----> Cerrar La Sesión Actual <----- //
    const handleLogout = () => {
        // Alerta para indicar que la sesión se va a cerrar
        const MySwalS = withReactContent(Swal);
        MySwalS.fire({
            title: 'Cerrando sesión',
            timer: 2000, // Tiempo en milisegundos (2 segundos)
            timerProgressBar: true,
            didOpen: () => {
                MySwalS.showLoading();
            },
        }).then(() => {
            // Elimina los datos del administrador de sessionStorage
            sessionStorage.removeItem("adminData");
            // Redirige al usuario al inicio
            navegacion("/");
        });
    };

    // -----> Mostrar los datos del administrador logeado actuales <----- //
    const adminData = JSON.parse(sessionStorage.getItem("adminData"));

    // -----> Enviar Datos ingresados en el formulario a la bd <----- //
    const [ fecha, setFecha ] = useState();
    const [ cliente, setCliente ] = useState();
    const [ cedulaNit, setCedulaNit ] = useState();
    const [ descripcion, setDescripcion ] = useState();
    const [ cantidad, setCantidad ] = useState(0);
    const [ precioUnitario, setPrecioUnitario ] = useState(0);
    const [ precioTotal, setPrecioTotal ] = useState(0);
    const [serverResponse, setServerResponse] = useState(null);

    // -----> Calcular el precioTotal con la Cantidad y el PrecioUnitario <----- //
    const handleCantidad = (e) => {
        const newCantidad = parseInt(e.target.value) || 0;
        setCantidad(newCantidad);
        calcularPrecioTotal(newCantidad, precioUnitario);
    };

    const handlePrecioUnitario = (e) => {
        const newPrecioUnitario = parseInt(e.target.value) || 0;
        setPrecioUnitario(newPrecioUnitario);
        calcularPrecioTotal(cantidad, newPrecioUnitario);
    };

    const calcularPrecioTotal = (cantidad, precioUnitario) => {
        const newPrecioTotal = cantidad * precioUnitario;
        setPrecioTotal(newPrecioTotal);
    };

    // -----> Enviar Datos ingresados en el formulario a la bd <----- //
    const navigated = useNavigate();

    const handleSubmitFactura = async () => {
        const form = document.querySelector(".FormFactura");
        if (form.checkValidity()) {
          try {
            const response = await axios.post("http://localhost:3001/CreateFactura", {
              fecha: fecha,
              cliente: cliente,
              cedulaNit: cedulaNit,
              descripcion: descripcion,
              cantidad: cantidad,
              precioUnitario: precioUnitario,
              precioTotal: precioTotal,
            });
    
            setServerResponse(response.data.message);
            Swal.fire({
              icon: "success",
              title: "Factura creada exitosamente",
              text: response.data.message
            });
          } catch (error) {
            console.error(error);
            setServerResponse("Error al crear la factura");
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Error al crear la factura",
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor, complete todos los campos obligatorios.",
          });
        }
    };

    // -----> Componente funcional para la alerta de "No has iniciado sesión  <----- //
    const SweetAlertNoSesion = () => {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: 'No has iniciado sesión',
            text: 'Por favor, inicia sesión para continuar.',
            icon: 'warning',
            confirmButtonText: 'Iniciar Sesión'
        }).then((result) => {
            if (result.isConfirmed) {
                navegacion('/');
            }
        });
        return null;
    };

    return(
        <div className="ContentFactura">
            {adminData ? (
                <section>
                    <div className="Nav">
                        <h4>Bienvenido <span>{adminData.nombre}</span></h4>
                        <Link onClick={handleLogout}>
                            <BiSolidLogOut size={30}/>
                        </Link>
                    </div>
                    <div className="ContentFormFact">
                        <h3>Crear Factura</h3>
                        <Form className="FormFactura">
                            {/* Datos del Cliente */}
                            <Row className="mb-3 Client">
                                <Form.Group className="mb-3">
                                    <Form.Label>Fecha Facturación</Form.Label>
                                    <Form.Control 
                                        type="date"
                                        value={fecha}
                                        onChange={(e) => setFecha(e.target.value)}
                                        required
                                        />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre Cliente</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        value={cliente}
                                        onChange={(e) => setCliente(e.target.value)}
                                        required
                                        />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cedula / Nit</Form.Label>
                                    <Form.Control 
                                        type="number"
                                        value={cedulaNit}
                                        onChange={(e) => setCedulaNit(e.target.value)}
                                        required
                                        />
                                </Form.Group>
                            </Row>
                            {/* Datos de los productos */}
                            <Row className="mb-3 Product">
                                <Form.Group className="mb-3">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        required
                                        />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3 Product2">
                                <Form.Group className="mb-3">
                                    <Form.Label>Cantidad</Form.Label>
                                    <Form.Control 
                                        type="number"
                                        value={cantidad}
                                        onChange={handleCantidad} 
                                        required
                                        />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Valor Unitario</Form.Label>
                                        <Form.Control 
                                            type="number"
                                        value={precioUnitario}
                                        onChange={handlePrecioUnitario}
                                        required
                                        />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Valor Total</Form.Label>
                                    <Form.Control 
                                        type="number"
                                        value={precioTotal}
                                        readOnly 
                                        required
                                        />
                                </Form.Group>
                            </Row>
                            <Button 
                                className='ButtonFact'
                                onClick={handleSubmitFactura}>
                                Crear Factura
                            </Button>
                        </Form>
                        <Link to='/FacturasCreadas'>
                            Ver Facturas Creadas
                        </Link>
                    </div>
                </section>
                ) : (
                    <SweetAlertNoSesion/>
                )}
        </div>
    )
}