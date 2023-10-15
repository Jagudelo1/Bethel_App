import React from "react";
import '../../css/FacturaApp.css';
import Logo from '../../assets/Logo.jpeg';
import { useLocation } from 'react-router-dom';
import Table from "react-bootstrap/esm/Table";

export function FacturaImp() {
    const location = useLocation();
    const { facturasSeleccionadas, numeroFactura } = location.state || {}; // Obtener las facturas seleccionadas
    const totalPrecioTotal = facturasSeleccionadas.reduce((total, factura) => total + factura.precioTotal, 0);

    // Verificar si hay facturas seleccionadas
    if (!facturasSeleccionadas || facturasSeleccionadas.length === 0) {
        return (
            <>
                <div className="Header1">
                    <h3>Factura #</h3>
                    <img src={Logo} alt="" />
                </div>
                <div className="Header2">
                    <h5>Papelería Bethel</h5>
                    <h5>Cra 15 # 6 - 34</h5>
                </div>
                <div className="Header3">
                    <p>No hay facturas seleccionadas</p>
                </div>
            </>
        );
    }

    // Extraer los datos de la primera factura seleccionada
    const primeraFactura = facturasSeleccionadas[0];

    return (
        <div className="ContentFactImp">
            <div className="borderContent">
                <div className="Header1">
                    <img src={Logo} alt="" />
                </div>
                <div className="Header2">
                    <div>
                        <h4>Factura #{numeroFactura}</h4>
                    </div>
                    <div className="InfoFactu">
                        <h6>Papelería Bethel</h6>
                        <h6>Nit: 16.888.167-0</h6>
                        <h6>Cel: 315 6152301</h6>
                        <h6>Cra 15 # 6 - 34 B / La Cabaña</h6>
                        <h6>bethelpapeleria9@gmail.com</h6>
                    </div>
                </div>
                <hr />
                <div className="Header3">
                    <div className="Header3_1">
                        <h5>Facturar A</h5>
                        <p>{primeraFactura.cliente}</p>
                        <p>C.C. o Nit: {primeraFactura.cedulaNit}</p>
                    </div>
                    <div className="Header3_2">
                        <h6>Fecha de Facturación: {new Date(primeraFactura.fecha).toLocaleDateString()}</h6>    
                    </div>
                </div>
                <div className="Header4">
                    <Table bordered >
                        <thead className="custom-thead">
                            <tr>
                                <th className="th">Cantidad</th>
                                <th>Descripción</th>
                                <th className="th1">Precio Unitario</th>
                                <th className="th1">Precio Total</th>
                            </tr>
                        </thead>
                        <tbody className="custom-tbody">
                            {facturasSeleccionadas.map((factura) => (
                            <tr key={factura.id_fact}>
                                <td>{factura.cantidad}</td>
                                <td>{factura.descripcion}</td>
                                <td>{factura.precioUnitario}</td>
                                <td>{factura.precioTotal}</td>
                            </tr>
                            ))}
                        </tbody>
                        <thead className="custom-thead">
                            <tr>
                                <th colSpan={3}>Valor Total</th>
                                <th>{totalPrecioTotal}</th>
                            </tr>
                        </thead>
                    </Table>
                </div>
            </div>
        </div>
    );
}
