import React, { useState, useEffect } from "react";
import DetalleBusquedaProducto from "./DetalleBusquedaProducto";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import EncabezadoProducto from "./EncabezadoProducto";

const BusquedaProducto = (props) => {
    const [Gestor, setGestor] = useState({
        Nombre_Producto: '',
        Categoria: ''
    })

    const navigate = useNavigate();

    const teclaPresionada = (e) => {
        const { name, value } = e.target
        setGestor({ ...Gestor, [name]: value })
    }

    const ClickBtnNuevo = () => {
        props.CambiarIdProducto(0)
        navigate("/Producto/DetalleProducto")
    }

    const DetalleProducto = (Descripcion) => {
        props.CambiarIdProducto(Descripcion)
        navigate("/Producto/DetalleProducto")
    }

    const ClickBtnDelete = async (ID_Producto) => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiProducto/EliminarProducto?ID_Producto=${ID_Producto}`;
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
                    title: "Producto eliminada exitosamente",
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
        let URL = `http://localhost:${props.ApiPort}/api/ApiProducto/ConsultaProductoNombreTipo?NombreProducto=${encodeURIComponent(Gestor.Nombre_Producto)}&Categoria=${encodeURIComponent(Gestor.Categoria)}`;
        try {
            let Productos = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - ClickBtnBuscar")
                    throw new Error(response.statusText)
                }
                return await response.json()
            }).catch(error => {
                console.log(error)
            })
            if (Productos.Codigo >= 0) {
                setListaProductos(Productos.Contenido)
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: Productos.Mensaje
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
        let URL = `http://localhost:${props.ApiPort}/api/ApiProducto/ReporteProducto?Nombre_Producto=${encodeURIComponent(Gestor.Nombre_Producto)}&Categoria=${encodeURIComponent(Gestor.Categoria)}`;
        try {
            let Result = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - ClickBtnDescargar")
                    throw new Error(response.statusText)
                }
                return await response.json()
            }).catch(error => {
                console.log(error)
            })
            if (Result.Codigo >= 0) {
                const templink = document.createElement('a')
                templink.href = `data:application/pdf;base64,${Result.Contenido}`
                templink.setAttribute('download', 'Reporte Productos.pdf')
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

    const cargarProductos = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiProducto/ConsultaProductoNombreTipo?NombreProducto=${Gestor.Nombre_Producto}&Categoria=${Gestor.Categoria}`
        try {
            let Productos = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok")
                    throw new Error(response.statusText)
                }
                return await response.json()
            }).catch(error => {
                console.log(error)
            })
            if (Productos.Codigo >= 0) {
                setListaProductos(Productos.Contenido)
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: Productos.Mensaje
                });
                //console.log(Productos.Mensaje)
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Conexión Inválida",
                text: "No se pudo establecer la conexión con el servidor"
            });
        }
    }

    const [ListaProductos, setListaProductos] = useState([])
    useEffect(() => {
        cargarProductos();
        //eslint-disable-next-line
    }, [])

    return <>
        <EncabezadoProducto ClickBtnNuevo={ClickBtnNuevo}
            ClickBtnBuscar={ClickBtnBuscar}
            ClickBtnDescargar={ClickBtnDescargar}
            teclaPresionada={teclaPresionada}
            Gestor={Gestor} />
        <DetalleBusquedaProducto ListaProductos={ListaProductos}
            DetalleProducto={DetalleProducto}
            ClickBtnDelete={ClickBtnDelete} />
    </>

}
export default BusquedaProducto;