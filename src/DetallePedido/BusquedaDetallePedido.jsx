import React, { useState, useEffect } from "react"
import DetallePedido from "../Pedidos/DetallePedido";
import EncabezadoDetallePedido from "./EncabezadoDetallePedido";
import TablaDetallePedido from "./TablaDetallePedido";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const BusquedaDetallePedido = (props) => {
    const [Gestor,setGestor]= useState({
        Nombre_Producto:'',
        Nombre_Sucursal:''
    })

    const navigate = useNavigate();

    const teclaPresionada = (e) => {
        const { name, value } = e.target
        //console.log(name)
        setGestor({ ...Gestor, [name]: value })
    }

    const[EditandoPedido,setEditandoPedido]= useState(false)
    const[EstadoPedido,setEstadoPedido]= useState(true)
    const [ListaDetallesPedido,setListaDetallesPedido]=useState([])

    const ClickBtnNuevo = () => {
        props.CambiarIdDetallePedido(0)
        navigate("/DetallePedido/LineaDetalle")
    }

    const LineaDetallePedido = (ID_Detalle) => {
        //console.log(ID_Detalle);
        props.CambiarIdDetallePedido(ID_Detalle)
        navigate("/DetallePedido/LineaDetalle")
    }


    const ClickBtnDelete = async (ID_Detalle, Monto) => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiDetallePedido/EliminarDetallePedido?ID_Detalle=${ID_Detalle}`;
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
                props.ModificarMontoTotalPedido(props.MontoTotalPedido - Monto);
                Swal.fire({
                    icon: "success",
                    title: "Detalle Pedido eliminado exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  ClickBtnBuscar();
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
        let URL = `http://localhost:${props.ApiPort}/api/ApiDetallePedido/ConsultaDetallesPedidoProductoSucursal?ID_Pedido=${props.IdPedidoActual}&Nombre_Producto=${encodeURIComponent(Gestor.Nombre_Producto)}&Nombre_Sucursal=${encodeURIComponent(Gestor.Nombre_Sucursal)}`;
        try {
            let DetallesPedido = await fetch(URL).then(async response => {
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
            if (DetallesPedido.Codigo >= 0) {
                setListaDetallesPedido(DetallesPedido.Contenido)
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: DetallesPedido.Mensaje
                  });
                //console.log(DetallesPedido.Mensaje)
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
        let URL = `http://localhost:${props.ApiPort}/api/ApiDetallePedido/ReporteDetallePedido?ID_Pedido=${props.IdPedidoActual}&Nombre_Producto=${encodeURIComponent(Gestor.Nombre_Producto)}&Nombre_Sucursal=${encodeURIComponent(Gestor.Nombre_Sucursal)}`;
        console.log(URL);
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
                templink.setAttribute('download','Reporte DetallePedido.pdf')
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

    const cargarDetallesPedido = async () => {
        if (props.IdPedidoActual > 0){
            let URL = `http://localhost:${props.ApiPort}/api/ApiDetallePedido/ConsultaDetallesPedidoxPedido?ID_Pedido=${props.IdPedidoActual}`
            try {
                let DetallesPedido = await fetch(URL).then(async response => {
                    if (!response.ok) {
                        console.log("No Ok - cargarDetallesPedido")
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
                if (DetallesPedido.Codigo >= 0) {
                    setListaDetallesPedido(DetallesPedido.Contenido)
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: DetallesPedido.Mensaje
                    });
                    //console.log(DetallesPedido.Mensaje)
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
        cargarDetallesPedido();
        //eslint-disable-next-line
    }, [])
    
    return <>
        <DetallePedido
        CambiarIdPedido={props.CambiarIdPedido} 
        IdPedidoActual={props.IdPedidoActual}
        ApiPort={props.ApiPort}
        EditandoPedido={EditandoPedido}
        setEditandoPedido={setEditandoPedido}
        MontoTotalPedido={props.MontoTotalPedido}
        CambiarMontoTotalPedido={props.CambiarMontoTotalPedido}
        EstadoPedido={EstadoPedido}
        setEstadoPedido={setEstadoPedido} />

        <EncabezadoDetallePedido 
        IdPedidoActual={props.IdPedidoActual} 
        ClickBtnNuevo={ClickBtnNuevo} 
        ClickBtnBuscar={ClickBtnBuscar}
        ClickBtnDescargar={ClickBtnDescargar}
        teclaPresionada={teclaPresionada}
        EstadoPedido={EstadoPedido}
        Gestor={Gestor} />

        <TablaDetallePedido 
        ListaDetallesPedido={ListaDetallesPedido} 
        LineaDetallePedido={LineaDetallePedido}
        EstadoPedido={EstadoPedido}
        ClickBtnDelete={ClickBtnDelete}/>

    </>
}
export default BusquedaDetallePedido;