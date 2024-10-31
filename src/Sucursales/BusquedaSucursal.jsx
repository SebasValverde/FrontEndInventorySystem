import React,{useState, useEffect} from "react";
import EncabezadoSucursal from "./EncabezadoSucursal";
import DetalleBusquedaSucursal from "./DetalleBusquedaSucursal";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const BusquedaSucursal=(props)=>{  
    const [Gestor,setGestor]= useState({
        Nombre_Sucursal:'',
        Descripcion:''
    })

    const navigate = useNavigate();

    const teclaPresionada = (e) => {
        const { name, value } = e.target
        //console.log(name)
        setGestor({ ...Gestor, [name]: value })
    }

    const ClickBtnNuevo = () => {
        props.CambiarIdSucursal(0)
        navigate("/Sucursales/DetalleSucursal")
    }

    const DetallesSucursal = (ID_Sucursal) => {
        //console.log(ID_Sucursal);
        props.CambiarIdSucursal(ID_Sucursal)
        navigate("/Sucursales/DetalleSucursal")
    }

    const ClickBtnDelete = async (ID_Sucursal) => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiSucursal/EliminarSucursal?ID_Sucursal=${ID_Sucursal}`;
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
                    title: "Sucursal eliminada exitosamente",
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

    const ClickBtnBuscar = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiSucursal/ConsultaSucursalesNombreDescripcion?Nombre_Sucursal=${encodeURIComponent(Gestor.Nombre_Sucursal)}&Descripcion=${encodeURIComponent(Gestor.Descripcion)}`;
        try {
            let Sucursales = await fetch(URL).then(async response => {
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
            if (Sucursales.Codigo >= 0) {
                setListaSucursales(Sucursales.Contenido)
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

    const ClickBtnDescargar = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiSucursal/ReporteSucursales?Nombre_Sucursal=${encodeURIComponent(Gestor.Nombre_Sucursal)}&Descripcion=${encodeURIComponent(Gestor.Descripcion)}`;
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
                templink.setAttribute('download','Reporte Sucursales.pdf')
                templink.click();
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: Result.Mensaje
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

    const cargarSucursales = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiSucursal/ConsultaSucursalxID?ID_Sucursal=`
        try {
            let Sucursales = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - cargarSucursales")
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
                setListaSucursales(Sucursales.Contenido)
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

    const [ListaSucursales,setListaSucursales]=useState([])

    useEffect(() => {
        cargarSucursales();
        //eslint-disable-next-line
    }, [])

    return <>
        <EncabezadoSucursal ClickBtnNuevo={ClickBtnNuevo} 
        ClickBtnBuscar={ClickBtnBuscar}
        ClickBtnDescargar={ClickBtnDescargar}
        teclaPresionada={teclaPresionada}
        Gestor={Gestor} />
        <DetalleBusquedaSucursal ListaSucursales={ListaSucursales} 
        DetallesSucursal={DetallesSucursal}
        ClickBtnDelete={ClickBtnDelete}/>
    </>
}
export default BusquedaSucursal;