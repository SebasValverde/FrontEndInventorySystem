import React, { useState, useEffect } from "react";
import DetalleBusquedaCategorias from "./DetalleBusquedaCategorias";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import EncabezadoCategorias from "./EncabezadoCategorias";

const BusquedaCategorias = (props) => {
    const [Gestor, setGestor] = useState({
        Nombre_Categoria: ''
    })

    const navigate = useNavigate();

    const teclaPresionada = (e) => {
        const { name, value } = e.target
        setGestor({ ...Gestor, [name]: value })
    }

    const ClickBtnNuevo = () => {
        props.CambiarIdCategoria(0)
        navigate("/TipoProducto/DetalleCategorias")
    }

    const DetalleCategorias = (Descripcion) => {
        props.CambiarIdCategoria(Descripcion)
        navigate("/TipoProducto/DetalleCategorias")
    }

    const ClickBtnDelete = async (ID_TipoProducto) => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiTipoProducto/EliminarTipoProducto?ID_TipoProducto=${encodeURIComponent(ID_TipoProducto)}`;
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
                    title: "Categoria eliminada exitosamente",
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
        let URL = `http://localhost:${props.ApiPort}/api/ApiTipoProducto/ConsultaTipoPNombre?Categoria=${encodeURIComponent(Gestor.Nombre_Categoria)}`;
        try {
            let Categorias = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - ClickBtnBuscar")
                    throw new Error(response.statusText)
                }
                return await response.json()
            }).catch(error => {
                console.log(error)
            })
            if (Categorias.Codigo >= 0) {
                setListaCategorias(Categorias.Contenido)
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: Categorias.Mensaje
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
        let URL = `http://localhost:${props.ApiPort}/api/ApiTipoProducto/ReporteCategoria?Categoria=${Gestor.Nombre_Categoria}`;
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
                templink.setAttribute('download', 'Reporte Categorias.pdf')
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

    const cargarCategorias = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiTipoProducto/ConsultaTipoPNombre?Categoria=${Gestor.Nombre_Categoria}`
        try {
            let Categorias = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok")
                    throw new Error(response.statusText)
                }
                return await response.json()
            }).catch(error => {
                console.log(error)
            })
            if (Categorias.Codigo >= 0) {
                setListaCategorias(Categorias.Contenido)
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: Categorias.Mensaje
                });
                //console.log(Categorias.Mensaje)
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Conexión Inválida",
                text: "No se pudo establecer la conexión con el servidor"
            });
        }
    }

    const [ListaCategorias, setListaCategorias] = useState([])

    useEffect(() => {
        cargarCategorias();
        //eslint-disable-next-line
    }, [])

    return <>
        <EncabezadoCategorias ClickBtnNuevo={ClickBtnNuevo}
            ClickBtnBuscar={ClickBtnBuscar}
            ClickBtnDescargar={ClickBtnDescargar}
            teclaPresionada={teclaPresionada}
            Gestor={Gestor} />
        <DetalleBusquedaCategorias ListaCategorias={ListaCategorias}
            DetalleCategorias={DetalleCategorias}
            ClickBtnDelete={ClickBtnDelete} />
    </>
}
export default BusquedaCategorias;