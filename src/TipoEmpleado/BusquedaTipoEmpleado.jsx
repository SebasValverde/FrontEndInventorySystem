import React,{useState, useEffect} from "react";
import EncabezadoTipoEmpleado from "./EncabezadoTipoEmpleado";
import DetalleBusquedaTipoEmpleado from "./DetalleBusquedaTipoEmpleado";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const BusquedaTipoEmpleado=(props)=>{ 
    const [Gestor,setGestor]= useState({
        Descripcion:''
    })

    const navigate = useNavigate();

    const teclaPresionada = (e) => {
        const { name, value } = e.target
        setGestor({ ...Gestor, [name]: value })
    }

    const [ListaTiposEmpleado,setListaTiposEmpleado]=useState([])

    const ClickBtnNuevo = () => {
        props.CambiarIdTipoEmpleado(0)
        navigate("/TiposEmpleado/DetalleTipoEmpleado")
    }

    const DetallesTipoEmpleado = (ID_TipoEmpleado) => {
        //console.log(ID_TipoEmpleado);
        props.CambiarIdTipoEmpleado(ID_TipoEmpleado)
        navigate("/TiposEmpleado/DetalleTipoEmpleado")
    }

    const ClickBtnDelete = async (ID_TipoEmpleado) => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiTipoEmpleado/EliminarTipoEmpleado?ID_TipoEmpleado=${ID_TipoEmpleado}`;
        try {
            let Result = await fetch(URL, {
                method: 'DELETE'
            }).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - ClickBtnDelete")
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
            if (Result.Codigo >= 0) {
                Swal.fire({
                    icon: "success",
                    title: "Tipo de Empleado eliminada exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  ClickBtnBuscar()
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

    const ClickBtnBuscar = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiTipoEmpleado/ConsultaTipoEmpleadoxDescripcion?Descripcion=${encodeURIComponent(Gestor.Descripcion)}`;
        try {
            let TiposEmpleado = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - ClickBtnBuscar")
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
                setListaTiposEmpleado(TiposEmpleado.Contenido)
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

    const ClickBtnDescargar = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiTipoEmpleado/ReporteTiposEmpleado?Descripcion=${encodeURIComponent(Gestor.Descripcion)}`;
        try {
            let Result = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - ClickBtnDescargar")
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
            if (Result.Codigo >= 0) {
                const templink= document.createElement('a')
                templink.href=`data:application/pdf;base64,${Result.Contenido}`
                templink.setAttribute('download','Reporte TipoEmplado.pdf')
                templink.click();
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

    const cargarTiposEmpleado = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiTipoEmpleado/ConsultaTipoEmpleado?ID_TipoEmpleado=`
        try {
            let TiposEmpleado = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - cargarTiposEmpleado")
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
                setListaTiposEmpleado(TiposEmpleado.Contenido)
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

    useEffect(() => {
        cargarTiposEmpleado();
        //eslint-disable-next-line
    }, [])

    return <>
        <EncabezadoTipoEmpleado ClickBtnNuevo={ClickBtnNuevo} 
        ClickBtnBuscar={ClickBtnBuscar}
        ClickBtnDescargar={ClickBtnDescargar}
        teclaPresionada={teclaPresionada}
        Gestor={Gestor} />
        <DetalleBusquedaTipoEmpleado ListaTiposEmpleado={ListaTiposEmpleado} 
        DetallesTipoEmpleado={DetallesTipoEmpleado}
        ClickBtnDelete={ClickBtnDelete}/>
    </>
}
export default BusquedaTipoEmpleado;
