import React,{useState, useEffect} from "react";
import EncabezadoCliente from "./EncabezadoCliente";
import DetalleBusquedaCliente from "./DetalleBusquedaCliente";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const BusquedaCliente=(props)=>{  
    const [Gestor,setGestor]= useState({
        // ID_Cliente:0,
        Nombre_Cliente:'',
        Direccion: ''
    })

    const navigate = useNavigate();

    const teclaPresionada = (e) => {
        const { name, value } = e.target
        //console.log(name)
        setGestor({ ...Gestor, [name]: value })
    }

    const ClickBtnNuevo = () => {
        props.CambiarIdCliente(0)
        navigate("/Cliente/DetalleCliente")
    }

    const DetalleCliente = (ID_Cliente) => {
        //console.log(ID_Cliente);
        props.CambiarIdCliente(ID_Cliente)
        navigate("/Cliente/DetalleCliente")
    }

    const ClickBtnDelete = async (ID_Cliente) => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiCliente/EliminarCliente?ID_Cliente=${ID_Cliente}`;
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
                    title: "Cliente eliminado exitosamente",
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
                //console.log(Clientes.Mensaje)
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
        let URL = `http://localhost:${props.ApiPort}/api/ApiCliente/ConsultaClientesNombreDireccion?Nombre_Cliente=${encodeURIComponent(Gestor.Nombre_Cliente)}&Direccion=${encodeURIComponent(Gestor.Direccion)}`;
        try {
            let Clientes = await fetch(URL).then(async response => {
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
            if (Clientes.Codigo >= 0) {
                setListaCliente(Clientes.Contenido)              
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: Clientes.Mensaje
                  });
                //console.log(Clientes.Mensaje)
            }  
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Conexión Inválida",
                text: "No se pudo establecer la conexión con el servidor"
            });
        }             
    }

    const cargarCliente = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiCliente/ConsultaClientesNombreDireccion?Nombre_Cliente=&Direccion=`
        try {
            let Cliente = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - cargarCliente")
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
            if (Cliente.Codigo >= 0) {
                
                setListaCliente(Cliente.Contenido)
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops... Cayo en el 'Else' de Cargar inventarios",
                    text: Cliente.Mensaje
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

    
    const [ListaCliente, setListaCliente]=useState([])

    useEffect(() => {

        cargarCliente();
        //eslint-disable-next-line
    }, [])

    return <>
        <EncabezadoCliente 
        ClickBtnNuevo={ClickBtnNuevo} 
        ClickBtnBuscar={ClickBtnBuscar}
        //ClickBtnDescargar={ClickBtnDescargar}
        teclaPresionada={teclaPresionada}
        Gestor={Gestor}
        ListaClientes={ListaCliente}
        
        />
        <DetalleBusquedaCliente 
        ListaCliente={ListaCliente} 
        DetalleCliente={DetalleCliente}
        ClickBtnDelete={ClickBtnDelete}/>
    </>
}
export default BusquedaCliente;