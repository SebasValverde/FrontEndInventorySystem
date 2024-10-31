import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const DetalleTipoEmpleado = (props) => {
    const navigate = useNavigate();
    const [TipoEmpleado, setTipoEmpleado] = useState({
        ID_TipoEmpleado: 0,
        Descripcion: ''
    })

    const CambioValor = (e) => {
        const { name, value } = e.target;
        setTipoEmpleado({
            ...TipoEmpleado,
            [name]: value
        });
    }

    const tituloTexto = props.IdTipoEmpleadoActual > 0 ? "Editar Tipo de Empleado" : "Nuevo Tipo de Empleado";

    const ClickBtnGuardar = async() => {
        let URL= props.IdTipoEmpleadoActual===0 ? `http://localhost:${props.ApiPort}/api/ApiTipoEmpleado/InsertarTipoEmpleado` : `http://localhost:${props.ApiPort}/api/ApiTipoEmpleado/ModificarTipoEmpleado`
        let Method = props.IdTipoEmpleadoActual===0 ? "POST" : "PATCH"
        try {
            let Result= await fetch(URL,{
                "method":Method,
                "headers":{
                    "content-type":"application/json",
                    "accept":"application/json",
                    "Access-Control-Allow-Origin":"*"
                },
                "body": JSON.stringify(TipoEmpleado)
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
                navigate("/TiposEmpleado/BusquedaTiposEmpleado")
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
        if (props.IdTipoEmpleadoActual > 0) {
            let URL = `http://localhost:${props.ApiPort}/api/ApiTipoEmpleado/ConsultaTipoEmpleado?ID_TipoEmpleado=${props.IdTipoEmpleadoActual}`
            try {
                let TiposEmpleado = await fetch(URL).then(async response => {
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
                if (TiposEmpleado.Codigo >= 0) {
                    setTipoEmpleado(TiposEmpleado.Contenido[0])
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: TiposEmpleado.Mensaje
                      });
                    //console.log(TiposEmpleado.Mensaje)
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
                        <label className="form-label mb-0">Descripción</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="text" className="form-control" name="Descripcion" id="Descripcion" maxLength="200" rows="3" value={TipoEmpleado.Descripcion} onChange={CambioValor}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <button className="btn btn-dark w-100" onClick={() => ClickBtnGuardar()}><i className="bi bi-floppy"></i> Guardar</button>
                    </div>
                    <div className="col-12 col-md-2 d-flex justify-content-md-start mt-2 mt-md-0">
                        <button className="btn btn-dark w-100" onClick={() => navigate("/TiposEmpleado/BusquedaTiposEmpleado")}><i className="bi bi-arrow-left"></i> Salir</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default DetalleTipoEmpleado;