import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import DetalleBusquedaProveedor from "./DetalleBusquedaProveedor";
import EncabezadoProveedor from "./EncabezadoProveedor";

const BusquedaProveedor = (props) => {
    const [Gestor, setGestor] = useState({
        Nombre_Proveedor: ''
    })

    const navigate = useNavigate();

    const teclaPresionada = (e) => {
        const { name, value } = e.target
        setGestor({ ...Gestor, [name]: value })
    }

    const ClickBtnNuevo = () => {
        props.CambiarIdProveedor(0)
        navigate("/Proveedor/DetalleProveedor")
    }

    const DetalleProveedor = (Descripcion) => {
        props.CambiarIdProveedor(Descripcion)
        navigate("/Proveedor/DetalleProveedor")
    }

    const ClickBtnDelete = async (ID_Proveedor) => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiProveedor/EliminarProveedor?ID_Proveedor=${ID_Proveedor}`;
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
                    title: "Proveedor eliminada exitosamente",
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
        let URL = `http://localhost:${props.ApiPort}/api/ApiProveedor/ConsultaProveedorNombre?Nombre=${encodeURIComponent(Gestor.Nombre_Proveedor)}`;
        try {
            let Proveedores = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - ClickBtnBuscar")
                    throw new Error(response.statusText)
                }
                return await response.json()
            }).catch(error => {
                console.log(error)
            })
            if (Proveedores.Codigo >= 0) {
                setListaProveedores(Proveedores.Contenido)
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: Proveedores.Mensaje
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
        let URL = `http://localhost:${props.ApiPort}/api/ApiProveedor/ImprimirReporteProveedor?Nombre=${encodeURIComponent(Gestor.Nombre_Proveedor)}`;
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
            templink.setAttribute('download', 'Reporte Proveedores.pdf')
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
    }


    const cargarProveedores = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiProveedor/ConsultaProveedorNombre?Nombre=${Gestor.Nombre_Proveedor}`
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
                setListaProveedores(Proveedores.Contenido)
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: Proveedores.Mensaje
                });
                //console.log(Proveedores.Mensaje)
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Conexión Inválida",
                text: "No se pudo establecer la conexión con el servidor"
            });
        }
    }

    const [ListaProveedores, setListaProveedores] = useState([])

    useEffect(() => {
        cargarProveedores();
        //eslint-disable-next-line
    }, [])

    return <>
        <EncabezadoProveedor ClickBtnNuevo={ClickBtnNuevo}
            ClickBtnBuscar={ClickBtnBuscar}
            ClickBtnDescargar={ClickBtnDescargar}
            teclaPresionada={teclaPresionada}
            Gestor={Gestor} />
        <DetalleBusquedaProveedor ListaProveedores={ListaProveedores}
            DetalleProveedor={DetalleProveedor}
            ClickBtnDelete={ClickBtnDelete} />
    </>


}
export default BusquedaProveedor;