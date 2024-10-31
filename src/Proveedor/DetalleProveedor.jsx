import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const DetalleProveedor = (props) => {
    const navigate = useNavigate();
    const [Proveedor, setProveedor] = useState({
        ID_Proveedor: 0,
        Nombre_Proveedor: '',
        Telefono: '',
        Direccion: ''
    })

    const CambioValor = (e) => {
        const { name, type, value, checked } = e.target;
        setProveedor({
            ...Proveedor,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    const tituloTexto = props.IdProveedorActual > 0 ? "Editar Proveedor producto" : "Nueva Proveedor producto";

    const ClickBtnGuardar = async () => {
        let URL = props.IdProveedorActual === 0 ? `http://localhost:${props.ApiPort}/api/ApiProveedor/InsertarProveedor` : `http://localhost:${props.ApiPort}/api/ApiProveedor/ModificarProveedor`
        let Method = props.IdProveedorActual === 0 ? "POST" : "PATCH"
        try {
            let Result = await fetch(URL, {
                "method": Method,
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": JSON.stringify(Proveedor)
            }).then(async response => {
                if (!response.ok) {
                    console.log("No Ok")
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
                navigate("/Proveedor/BusquedaProveedor")
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
        if (props.IdProveedorActual > 0) {
            let URL = `http://localhost:${props.ApiPort}/api/ApiProveedor/ConsultaProveedor?ID_Proveedor=${props.IdProveedorActual}`
            try {
                let Proveedores = await fetch(URL).then(async response => {
                    if (!response.ok) {
                        console.log("No Ok")
                        throw new Error(response.statusText)
                    }
                    return await response.json()
                }).catch(error => {
                    console.log(error)
                })
                if (Proveedores.Codigo >= 0) {
                    setProveedor(Proveedores.Contenido[0])
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: Proveedores.Mensaje
                    });

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
                        <label className="form-label mb-0">Nombre de Proveedor</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="text" className="form-control" name="Nombre_Proveedor" id="Nombre_Proveedor" maxLength="100" value={Proveedor.Nombre_Proveedor} onChange={CambioValor} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Teléfono</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="number" className="form-control" name="Telefono" id="Telefono" value={Proveedor.Telefono} onChange={CambioValor} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Direccion</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <textarea className="form-control" name="Direccion" id="Direccion" maxLength="200" rows="3" value={Proveedor.Direccion} onChange={CambioValor}></textarea>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <button className="btn btn-dark w-100" onClick={() => ClickBtnGuardar()}><i className="bi bi-floppy"></i> Guardar</button>
                    </div>
                    <div className="col-12 col-md-2 d-flex justify-content-md-start mt-2 mt-md-0">
                        <button className="btn btn-dark w-100" onClick={() => navigate("/Proveedor/BusquedaProveedor")}><i className="bi bi-arrow-left"></i> Salir</button>
                    </div>
                </div>
            </div>
        </div>
    </>




}
export default DetalleProveedor;