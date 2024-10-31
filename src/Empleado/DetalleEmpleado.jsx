import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const DetalleEmpleado = (props) => {
    const navigate = useNavigate();
    
    const [Empleado, setEmpleado] = useState({
        ID_Empleado: 0,
        Nombre_Empleado: '',
        ID_TipoEmpleado: 0,
        Correo_Empleado: ''
    })

    const CambioValor = (e) => {
        const { name, type, value, checked } = e.target;
        setEmpleado({
            ...Empleado,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    const [ListaTipoEmpleado, setListaTipoEmpleado] = useState([])

    const obtenerTipoEmpleado = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiTipoEmpleado/ConsultaTipoEmpleado?ID_TipoEmpleado=`
        try {
            let TipoEmpleado = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - obtenerTipoEmpleados")
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
            if (TipoEmpleado.Codigo >= 0) {

                setListaTipoEmpleado(TipoEmpleado.Contenido);
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: TipoEmpleado.Mensaje
                });
                //console.log(Sucursales.Mensaje)
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Conexión Inválida",
                text: "No se pudo establecer la conexión con el servidor (fallo al obtener el nombre del tipo de Empleado)."
            });
        }
    };

    //  const cargarTipoEmpleados = async () => {
    //      let URL = `http://localhost:${props.ApiPort}/api/ApiEmpleado/ConsultaEmpleado?ID_Empleado=${props.IdEmpleadoActual}`
    //         try {
    //             let TipoEmpleado = await fetch(URL).then(async response => {
    //                 if (!response.ok) {
    //                     console.log("No Ok")
    //                     throw new Error(response.statusText)
    //                 }
    //                 return await response.json()
    //             }).catch(error => {
    //                 console.log(error)
    //             })
    //             if (TipoEmpleado.Codigo >= 0) {
    //                 setListaTipoEmpleado(TipoEmpleado.Contenido)
    //             }
    //             else {
    //                 Swal.fire({
    //                     icon: "error",
    //                     title: "Oops...",
    //                     text: TipoEmpleado.Mensaje
    //                 });
    //             }
    //         } catch (error) {
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Conexión Inválida",
    //                 text: "No se pudo establecer la conexión con el servidor. estas en cargando formulario btw"
    //             });
    //         }
    // }

    const tituloTexto = props.IdEmpleadoActual > 0 ? "Editar Empleado" : "Nuevo Empleado";

    const ClickBtnGuardar = async () => {
        let URL = props.IdEmpleadoActual === 0 ? `http://localhost:${props.ApiPort}/api/ApiEmpleado/InsertarEmpleado` : `http://localhost:${props.ApiPort}/api/ApiEmpleado/ModificarEmpleado`
        let Method = props.IdEmpleadoActual === 0 ? "POST" : "PATCH"
        try {
            let Result = await fetch(URL, {
                "method": Method,
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": JSON.stringify(Empleado)
            })
            .then(async response => {
                if (!response.ok) {
                    console.log("No Ok")
                    throw new Error(response.statusText)
                }
                return await response.json()
            })
            .catch(error => {
                console.log(error)
            })

            if (Result.Codigo >= 0) {
                Swal.fire({
                    icon: "success",
                    title: "Información guardada exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/Empleado/BusquedaEmpleado")
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: Result.Mensaje
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Conexión Inválida",
                text: "No se pudo establecer la conexión con el servidor. Else de clickguardar"
            });
        }
    }

    const cargandoFormulario = async () => {
        if (props.IdEmpleadoActual > 0) {
            let URL = `http://localhost:${props.ApiPort}/api/ApiEmpleado/ConsultaEmpleado?ID_Empleado=${props.IdEmpleadoActual}`
            try {
                let Empleado = await fetch(URL).then(async response => {
                    if (!response.ok) {
                        console.log("No Ok")
                        throw new Error(response.statusText)
                    }
                    return await response.json()
                }).catch(error => {
                    console.log(error)
                })
                if (Empleado.Codigo >= 0) {
                    setEmpleado(Empleado.Contenido[0])
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: Empleado.Mensaje
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Conexión Inválida",
                    text: "No se pudo establecer la conexión con el servidor. estas en cargando formulario btw"
                });
            }
        }
    }

    useEffect(() => {
        
        obtenerTipoEmpleado();
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
                        <label className="form-label mb-0">Nombre de Empleado</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="text" className="form-control" name="Nombre_Empleado" id="Nombre_Empleado" maxLength="100" value={Empleado.Nombre_Empleado} onChange={CambioValor} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Tipo de Empleado</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <select
                            name="ID_TipoEmpleado"
                            id="ID_TipoEmpleado"
                            className="form-control"
                            value={Empleado.ID_TipoEmpleado}
                            onChange={CambioValor}
                            >
                            <option value="0">Seleccionar Empleado</option>
                            {ListaTipoEmpleado.map((tipoEmpleado) => (
                                <option key={tipoEmpleado.ID_TipoEmpleado} value={tipoEmpleado.ID_TipoEmpleado}>{tipoEmpleado.Descripcion}</option>
                            ))}
                        </select>
                </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Correo electrónico</label>
                    </div>
                    <div className="col-12 col-md-4">
                    <input type="text" className="form-control" name="Correo_Empleado" id="Correo_Empleado" maxLength="200" rows="3" value={Empleado.Correo_Empleado} onChange={CambioValor}></input>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <button className="btn btn-dark w-100" onClick={() => ClickBtnGuardar()}><i className="bi bi-floppy"></i> Guardar</button>
                    </div>
                    <div className="col-12 col-md-2 d-flex justify-content-md-start mt-2 mt-md-0">
                        <button className="btn btn-dark w-100" onClick={() => navigate("/Empleado/BusquedaEmpleado")}><i className="bi bi-arrow-left"></i> Salir</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default DetalleEmpleado;