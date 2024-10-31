import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const DetalleCliente = (props) => {
    const navigate = useNavigate();
    const [Cliente, setCliente] = useState({
        ID_Cliente: 0,
        Nombre_Cliente: '',
        Telefono: 0,
        Direccion: ''
    })

    const CambioValor = (e) => {
        const { name, value } = e.target;
        setCliente({
            ...Cliente,
            [name]: value
        });
    }

    const tituloTexto = props.IdClienteActual > 0 ? "Editar Cliente" : "Nuevo Cliente";

    const ClickBtnGuardar = async () => {
        let URL= props.IdClienteActual===0 ? `http://localhost:${props.ApiPort}/api/ApiCliente/InsertarCliente` : `http://localhost:${props.ApiPort}/api/ApiCliente/ModificarCliente`
        let Method = props.IdClienteActual === 0 ? "POST" : "PATCH"
        try {
            let Result = await fetch(URL, {
                "method": Method,
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": JSON.stringify(Cliente)
            }).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - ClickBtnGuardar")
                    throw new Error(response.statusText)
                }
                return await response.json()
            }).catch(error => {
                console.log(error)
            })

            if (Result.Codigo >= 0) {
                Swal.fire({
                    icon: "success",
                    title: "Información guardada exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/Cliente/BusquedaCliente")
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: Result.Mensaje
                });
                //console.log(Result.Mensaje)
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Conexión Inválida",
                text: "No se pudo establecer la conexión con el servidor"
            });
        }
    }

    const cargandoFormulario = async () => {
        if (props.IdClienteActual > 0) {
            let URL = `http://localhost:${props.ApiPort}/api/ApiCliente/ConsultaCliente?ID_Cliente=${props.IdClienteActual}`
            try {
                let Clientes = await fetch(URL).then(async response => {
                    if (!response.ok) {
                        console.log("No Ok - cargandoFormulario")
                        throw new Error(response.statusText)
                    }
                    return await response.json()
                }).catch(error => {
                    Swal.fire({
                        icon: "error",
                        title: "Error de Ejecución",
                        text: "Ocurrio un problema al intentar ejecutar esta función."
                    });
                    console.log(error)
                })
                if (Clientes.Codigo >= 0) {
                    setCliente(Clientes.Contenido[0])
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: Clientes.Mensaje
                    });
                    //console.log(Sucursales.Mensaje)
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Conexión Inválida",
                    text: "No se pudo establecer la conexión con el servidor"
                });
            }
        }
    }

    useEffect(() => {
        cargandoFormulario();
        //eslint-disable-next-line
    }, [])

    return <>
        <div style={{ backgroundColor: '#d4d4d4', padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '55px', backgroundColor: '#6f9954' }}>
                <h3 style={{ margin: 0, textAlign: 'center', color: "white" }}>{tituloTexto}</h3>
            </header>
            <div className="container mt-3">
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Nombre del Cliente</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="text" className="form-control" name="Nombre_Cliente" id="Nombre_Cliente" maxLength="100" value={Cliente.Nombre_Cliente} onChange={CambioValor} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Teléfono</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="number" className="form-control" name="Telefono" id="Telefono" value={Cliente.Telefono} onChange={CambioValor} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Descripción</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <textarea className="form-control" name="Direccion" id="Direccion" maxLength="200" rows="3" value={Cliente.Direccion} onChange={CambioValor}></textarea>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <button className="btn btn-dark w-100" onClick={() => ClickBtnGuardar()}><i className="bi bi-floppy"></i> Guardar</button>
                    </div>
                    <div className="col-12 col-md-2 d-flex justify-content-md-start mt-2 mt-md-0">
                        <button className="btn btn-dark w-100" onClick={() => navigate("/Cliente/BusquedaCliente")}><i className="bi bi-arrow-left"></i> Salir</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default DetalleCliente;