import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import DetalleBusquedaEmpleado from "./DetalleBusquedaEmpleado";
import EncabezadoEmpleado from "./EncabezadoEmpleado";

const BusquedaEmpleado = (props) => {
    const [Gestor, setGestor] = useState({
        Nombre_Empleado: '',
        Correo_Empleado: ''

    })

    const navigate = useNavigate();

    const teclaPresionada = (e) => {
        const { name, value } = e.target
        setGestor({ ...Gestor, [name]: value })
    }

    const ClickBtnNuevo = () => {
        props.CambiarIdEmpleado(0)
        navigate("/Empleado/DetalleEmpleado")
    }

    const DetalleEmpleado = (Correo_Empleado) => {
        props.CambiarIdEmpleado(Correo_Empleado)
        navigate("/Empleado/DetalleEmpleado")
    }

    const ClickBtnDelete = async (ID_Empleado) => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiEmpleado/EliminarEmpleado?ID_Empleado=${ID_Empleado}`;
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
                console.log(error)
            })
            if (Result.Codigo >= 0) {
                Swal.fire({
                    icon: "success",
                    title: "Registro de empleado eliminado exitosamente",
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
        let URL = `http://localhost:${props.ApiPort}/api/ApiEmpleado/ConsultaEmpleadosPorNombreCorreo?Nombre_Empleado=${encodeURIComponent(Gestor.Nombre_Empleado)}&Correo_Empleado=${encodeURIComponent(Gestor.Correo_Empleado)}`;
        try {
            let Empleados = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - ClickBtnBuscar")
                    throw new Error(response.statusText)
                }
                return await response.json()
            }).catch(error => {
                console.log(error)
            })
            if (Empleados.Codigo >= 0) {
                setListaEmpleados(Empleados.Contenido)
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: Empleados.Mensaje
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

    const cargarEmpleados = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiEmpleado/ConsultaEmpleado?ID_Empleado=`
        try {
            let Empleados = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok")
                    throw new Error(response.statusText)
                }
                return await response.json()
            }).catch(error => {
                console.log(error)
            })
            if (Empleados.Codigo >= 0) {
                setListaEmpleados(Empleados.Contenido)
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: Empleados.Mensaje
                });
                //console.log(Empleados.Mensaje)
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Conexión Inválida",
                text: "No se pudo establecer la conexión con el servidor"
            });
        }
    }

    const [ListaEmpleados, setListaEmpleados] = useState([])

    useEffect(() => {
        cargarEmpleados();
        //eslint-disable-next-line
    }, [])

    return <>
        <EncabezadoEmpleado ClickBtnNuevo={ClickBtnNuevo}
            ClickBtnBuscar={ClickBtnBuscar}
            teclaPresionada={teclaPresionada}
            Gestor={Gestor} />
        <DetalleBusquedaEmpleado 
            ListaEmpleados={ListaEmpleados}
            DetalleEmpleado={DetalleEmpleado}
            ClickBtnDelete={ClickBtnDelete} />
    </>
}
export default BusquedaEmpleado;