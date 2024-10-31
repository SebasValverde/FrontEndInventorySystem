import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const DetalleInventario = (props) => {
    const navigate = useNavigate();

    const [Inventario, setInventario] = useState({
        ID_Inventario: 0,
        ID_Sucursal: 0,
        Nombre_Producto: 0,
        Cantidad: 0,
        Estado: true
    })
    
    const [ultimaCantidad, setultimaCantidad] = useState(0)

    const CambioValor = (e) => {
        const { name, value } = e.target;
        setInventario({
            ...Inventario,
            [name]: value
        });
    }

    const tituloTexto = props.IdInventarioActual > 0 ? "Editar Inventario" : "Nuevo Inventario";

    const [ListaProductos, setListaProductos] = useState([])

    const [ListaSucursales, setListaSucursales] = useState([])

    const obtenerProductos = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiProducto/ConsultaProductoNombreTipo?NombreProducto=&Categoria=`
        try {
            let Productos = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - obtenerProductos")
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
            if (Productos.Codigo >= 0) {

                setListaProductos(Productos.Contenido);
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
                text: "No se pudo establecer la conexión con el servidor (fallo al obtener el nombre de los productos)."
            });
        }
    };

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
    };

    const ClickBtnGuardar = async () => {
        //console.log(Inventario)
        let URL;
        let Method;

        if (props.IdInventarioActual === 0) {
            // Caso de nuevo inventario
            URL = `http://localhost:${props.ApiPort}/api/ApiInventario/NuevoInventario`;
            Method = "POST";
        } else {
            // Caso de modificar inventario (sumar/restar)
            if (Inventario.Cantidad === ultimaCantidad){
                navigate("/Inventario/BusquedaInventario");
                return;
            }else if (Inventario.Cantidad >= ultimaCantidad) {   
                URL = `http://localhost:${props.ApiPort}/api/ApiInventario/ModificarInventarioAgregar?ID_Sucursal=${Inventario.ID_Sucursal}&ID_Producto=${Inventario.ID_Producto}&CantidadPorAgregar=${Inventario.Cantidad - ultimaCantidad}`;
                //console.log(URL)
            } else {
                URL = `http://localhost:${props.ApiPort}/api/ApiInventario/ModificarInventarioRestar?ID_Sucursal=${Inventario.ID_Sucursal}&ID_Producto=${Inventario.ID_Producto}&CantidadPorEliminar=${ultimaCantidad - Inventario.Cantidad}`;
            }
            Method = "PATCH";
        }

        try {
            let Result = await fetch(URL, {
                method: Method,
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(Inventario) // El objeto Inventario que estás enviando
            }).then(async response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return await response.json();
            }).catch(error => {
                console.log(error);
            });

            if (Result.Codigo >= 0) {
                Swal.fire({
                    icon: "success",
                    title: "Información guardada exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/Inventario/BusquedaInventario");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: Result.Mensaje
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Conexión Inválida",
                text: "No se pudo establecer la conexión con el servidor."
            });
        }
    };

    const cargandoFormulario = async () => {
        if (props.IdInventarioActual > 0) {
            let URL = `http://localhost:${props.ApiPort}/api/ApiInventario/ConsultaInventario?ID_Inventario=${props.IdInventarioActual}`
            try {
                let Inventarios = await fetch(URL).then(async response => {
                    if (!response.ok) {
                        console.log("No Ok - cargandoFormulario")
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
                    setInventario(Inventarios.Contenido[0]
                    )
                    setultimaCantidad(Inventarios.Contenido[0].Cantidad)
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops... El error nos trajo el 'Else' de cargando formulario. Revisar antes de aca",
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
    };

    useEffect(() => {
        obtenerSucursales();
        obtenerProductos();
        cargandoFormulario();

        //eslint-disable-next-line
    }, [])


    return <>
        <div style={{ backgroundColor: '#d4d4d4', padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '55px', backgroundColor: '#6f9954' }}>
                <h3 style={{ margin: 0, textAlign: 'center', color: "white" }}>{tituloTexto}</h3>
            </header>
            <div className="container mt-3">
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Sucursal</label>
                    </div>
                    <div className="col-12 col-md-4">

                        {props.IdInventarioActual > 0 ? (
                            <label className="form-label mb-0">
                            {
                                ListaSucursales.find(sucursal => sucursal.ID_Sucursal === Inventario.ID_Sucursal)?.Nombre_Sucursal || 'Sucursal no encontrada'
                            }
                        </label>
                        ) : (
                            <select
                                name="ID_Sucursal"
                                id="ID_Sucursal"
                                className="form-control"
                                value={Inventario.ID_Sucursal}
                                onChange={CambioValor}
                            >
                                <option value="0">Seleccionar sucursal</option>
                                {ListaSucursales.map((sucursal) => (
                                    <option key={sucursal.ID_Sucursal} value={sucursal.ID_Sucursal}>{sucursal.Nombre_Sucursal}</option>
                                ))}
                            </select>
                        )
                        }
                    </div>

                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Producto</label>
                    </div>
                    <div className="col-12 col-md-4">
                        {props.IdInventarioActual > 0 ? (
                            <label className="form-label mb-0">
                            {
                                ListaProductos.find(producto => producto.ID_Producto === Inventario.ID_Producto)?.Nombre_Producto || 'Producto no encontrada'
                            }
                        </label>

                        ) : (
                            <select
                                name="ID_Producto"
                                id="ID_Producto"
                                className="form-control"
                                value={Inventario.ID_Producto}
                                onChange={CambioValor}
                            >
                                <option value="0"> Seleccionar producto </option>
                                {ListaProductos.map((producto) => (
                                    <option key={producto.ID_Producto} value={producto.ID_Producto}>{producto.Nombre_Producto}</option>
                                ))}
                            </select>
                        )
                        }

                    </div>

                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Cantidad</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input className="form-control" name="Cantidad" id="Cantidad" maxLength="200" rows="3" value={Inventario.Cantidad} onChange={CambioValor}></input>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <button className="btn btn-dark w-100" onClick={() => ClickBtnGuardar()}><i className="bi bi-floppy"></i> Guardar</button>
                    </div>
                    <div className="col-12 col-md-2 d-flex justify-content-md-start mt-2 mt-md-0">
                        <button className="btn btn-dark w-100" onClick={() => navigate("/Inventario/BusquedaInventario")}><i className="bi bi-arrow-left"></i> Salir</button>
                    </div>
                </div>
            </div>
        </div>
    </>

}
export default DetalleInventario;