import React,{useState, useEffect} from "react";
import EncabezadoInventario from "./EncabezadoInventario";
import DetalleBusquedaInventario from "./DetalleBusquedaInventario";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const BusquedaInventario=(props)=>{  
    const [Gestor,setGestor]= useState({
        ID_Sucursal:0,
        Nombre_Producto:''
    })
    
    const[ListaSucursales,setListaSucursales]= useState([])

    const navigate = useNavigate();

    const teclaPresionada = (e) => {
        const { name, value } = e.target
        //console.log(name)
        setGestor({ ...Gestor, [name]: value, [name]: (name === "ID_Sucursal") ? parseInt(value, 10) : value })
    }

    const ClickBtnNuevo = () => {
        props.CambiarIdInventario(0)
        navigate("/Inventario/DetalleInventario")
    }

    const DetallesInventario = (ID_Inventario) => {
        //console.log(ID_Inventario);
        props.CambiarIdInventario(ID_Inventario)
        navigate("/Inventario/DetalleInventario")
    }

    const ClickBtnDelete = async (ID_Inventario) => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiInventario/EliminarInventario?ID_Inventario=${ID_Inventario}`;
        try {
            let Result = await fetch(URL, {
                method: 'PATCH'
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
                    title: "Inventario eliminado exitosamente",
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
                //console.log(Inventarios.Mensaje)
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
        let URL = `http://localhost:${props.ApiPort}/api/ApiInventario/ConsultaInventarioxSucursalProducto?ID_Sucursal=${encodeURIComponent(Gestor.ID_Sucursal)}&Nombre_Producto=${encodeURIComponent(Gestor.Nombre_Producto)}`;
        try {
            let Inventarios = await fetch(URL).then(async response => {
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
            if (Inventarios.Codigo >= 0) {
                const inventariosFiltrados = Inventarios.Contenido.filter(inventario => inventario.Estado === true);
                setListaInventarios(inventariosFiltrados)
                
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: Inventarios.Mensaje
                  });
                //console.log(Inventarios.Mensaje)
            }  
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Conexión Inválida",
                text: "No se pudo establecer la conexión con el servidor"
            });
        }             
    }

    const cargarInventarios = async () => {
        // let URL = `http://localhost:${props.ApiPort}/api/ApiInventario/ConsultaInventarioxSucursal?ID_Sucursal=${Gestor.ID_Sucursal}`
        let URL = `http://localhost:${props.ApiPort}/api/ApiInventario/ConsultaInventarioxSucursalProducto`
        try {
            let Inventarios = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - cargarInventarios")
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
            if (Inventarios.Codigo >= 0) {
                const inventariosFiltrados = Inventarios.Contenido.filter(inventario => inventario.Estado === true);
                setListaInventarios(inventariosFiltrados)
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops... Cayo en el 'Else' de Cargar inventarios",
                    text: Inventarios.Mensaje
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

    const obtenerSucursales = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiSucursal/ConsultaSucursalxID?ID_Sucursal=`
        try {
            let Sucursales = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - obtenerSucursales")
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
                
                setListaSucursales(Sucursales.Contenido);
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
                text: "No se pudo establecer la conexión con el servidor (fallo al obtener sucursales)."
            });
        }
    }
    const [ListaInventarios,setListaInventarios]=useState([])

    useEffect(() => {
        cargarInventarios();
        obtenerSucursales();
        //eslint-disable-next-line
    }, [])

    return <>
        <EncabezadoInventario 
        ClickBtnNuevo={ClickBtnNuevo} 
        ClickBtnBuscar={ClickBtnBuscar}
        //ClickBtnDescargar={ClickBtnDescargar}
        teclaPresionada={teclaPresionada}
        Gestor={Gestor}
        ListaSucursales={ListaSucursales}
        
        />
        <DetalleBusquedaInventario 
        ListaInventarios={ListaInventarios} 
        DetallesInventario={DetallesInventario}
        ClickBtnDelete={ClickBtnDelete}/>
    </>
}
export default BusquedaInventario;