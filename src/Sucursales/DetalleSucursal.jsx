import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const DetalleSucursal = (props) => {
    const navigate = useNavigate();
    const [Sucursal, setSucursal] = useState({
        ID_Sucursal: 0,
        Nombre_Sucursal: '',
        Telefono: 0,
        Descripcion: '',
        Estado: true
    })

    const CambioValor = (e) => {
        const { name, type, value, checked } = e.target;
        setSucursal({
            ...Sucursal,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    const tituloTexto = props.IdSucursalActual > 0 ? "Editar Sucursal" : "Nueva Sucursal";

    const ClickBtnGuardar = async() => {
        let URL= props.IdSucursalActual===0 ? `http://localhost:${props.ApiPort}/api/ApiSucursal/InsertarSucursal` : `http://localhost:${props.ApiPort}/api/ApiSucursal/ModificarSucursal`
        let Method = props.IdSucursalActual===0 ? "POST" : "PATCH"
        try {
            let Result= await fetch(URL,{
                "method":Method,
                "headers":{
                    "content-type":"application/json",
                    "accept":"application/json",
                    "Access-Control-Allow-Origin":"*"
                },
                "body": JSON.stringify(Sucursal)
            }).then(async response =>{
                if(!response.ok){
                    console.log("No Ok - ClickBtnGuardar")
                    throw new Error (response.statusText)
                }
                return await response.json()
            }).catch(error=>{
                console.log(error)
            })
            
            if(Result.Codigo>=0){
                Swal.fire({
                    icon: "success",
                    title: "Información guardada exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                  });
                navigate("/Sucursales/BusquedaSucursales")
            }
            else{
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
        if (props.IdSucursalActual > 0) {
            let URL = `http://localhost:${props.ApiPort}/api/ApiSucursal/ConsultaSucursalxID?ID_Sucursal=${props.IdSucursalActual}`
            try {
                let Sucursales = await fetch(URL).then(async response => {
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
                if (Sucursales.Codigo >= 0) {
                    setSucursal(Sucursales.Contenido[0])
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: Sucursales.Mensaje
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
                        <label className="form-label mb-0">Nombre de Sucursal</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="text" className="form-control" name="Nombre_Sucursal" id="Nombre_Sucursal" maxLength="100" value={Sucursal.Nombre_Sucursal} onChange={CambioValor} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Teléfono</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="number" className="form-control" name="Telefono" id="Telefono" value={Sucursal.Telefono} onChange={CambioValor} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Descripción</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <textarea className="form-control" name="Descripcion" id="Descripcion" maxLength="200" rows="3" value={Sucursal.Descripcion} onChange={CambioValor}></textarea>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Estado</label>
                    </div>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        <input type="checkbox" className="form-check-input" name="Estado" id="Estado" checked={Sucursal.Estado} onChange={CambioValor} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <button className="btn btn-dark w-100" onClick={() => ClickBtnGuardar()}><i className="bi bi-floppy"></i> Guardar</button>
                    </div>
                    <div className="col-12 col-md-2 d-flex justify-content-md-start mt-2 mt-md-0">
                        <button className="btn btn-dark w-100" onClick={() => navigate("/Sucursales/BusquedaSucursales")}><i className="bi bi-arrow-left"></i> Salir</button>
                    </div>
                </div>
            </div>
        </div>
    </>

}
export default DetalleSucursal;