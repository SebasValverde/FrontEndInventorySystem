import React,{useState, useEffect} from "react";
import EncabezadoPedido from "./EncabezadoPedido";
import DetalleBusquedaPedido from "./DetalleBusquedaPedido";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const BusquedaPedido=(props)=>{  
    const [Gestor,setGestor]= useState({
        Nombre_Cliente:'',
        Nombre_Empleado:''
    })

    const navigate = useNavigate();

    const teclaPresionada = (e) => {
        const { name, value } = e.target
        //console.log(name)
        setGestor({ ...Gestor, [name]: value })
    }

    const ClickBtnNuevo = () => {
        props.CambiarIdPedido(0)
        props.CambiarMontoTotalPedido(0)
        navigate("/Pedidos/DetallePedido")
    }

    const DetallesPedido = (ID_Pedido) => {
        //console.log(ID_Pedido);
        props.CambiarIdPedido(ID_Pedido)
        navigate("/Pedidos/DetallePedido")
    }

    const ClickBtnDelete = async (ID_Pedido) => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiPedido/EliminarPedido?ID_Pedido=${ID_Pedido}`;
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
                    title: "Pedido y sus Detalles eliminados exitosamente",
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
        let URL = `http://localhost:${props.ApiPort}/api/ApiPedido/ConsultaPedidosClienteEmpleado?Nombre_Cliente=${encodeURIComponent(Gestor.Nombre_Cliente)}&Nombre_Empleado=${encodeURIComponent(Gestor.Nombre_Empleado)}`;
        try {
            let Pedidos = await fetch(URL).then(async response => {
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
            if (Pedidos.Codigo >= 0) {
                setListaPedidos(Pedidos.Contenido)
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: Pedidos.Mensaje
                  });
                //console.log(Pedidos.Mensaje)
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
       let URL = `http://localhost:${props.ApiPort}/api/ApiPedido/ReporterPedidos?Nombre_Cliente=${encodeURIComponent(Gestor.Nombre_Cliente)}&Nombre_Empleado=${encodeURIComponent(Gestor.Nombre_Empleado)}`;
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
                templink.setAttribute('download','Reporte Pedidos.pdf')
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

    const cargarPedidos = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiPedido/ConsultaPedidoxID?ID_Pedido=`
        try {
            let Pedidos = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - cargarPedidos")
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
            if (Pedidos.Codigo >= 0) {
                setListaPedidos(Pedidos.Contenido)
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: Pedidos.Mensaje
                });
                //console.log(Pedidos.Mensaje)
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Conexión Inválida",
                text: "No se pudo establecer la conexión con el servidor"
            });
        }    
    }

    const [ListaPedidos,setListaPedidos]=useState([])

    useEffect(() => {
        cargarPedidos();
        //eslint-disable-next-line
    }, [])

    return <>
        <EncabezadoPedido ClickBtnNuevo={ClickBtnNuevo} 
        ClickBtnBuscar={ClickBtnBuscar}
        ClickBtnDescargar={ClickBtnDescargar}
        teclaPresionada={teclaPresionada}
        Gestor={Gestor} />
        <DetalleBusquedaPedido ListaPedidos={ListaPedidos} 
        DetallesPedido={DetallesPedido}
        ClickBtnDelete={ClickBtnDelete}/>
    </>
}
export default BusquedaPedido;