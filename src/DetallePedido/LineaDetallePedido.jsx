import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const LineaDetallePedido = (props) => {
    const navigate = useNavigate();

    const [DetallePedido, setDetallePedido] = useState({
        ID_Detalle: 0,       
        ID_Pedido: props.IdPedidoActual,
        ID_Sucursal: 0,
        Nombre_Sucursal: '',
        ID_Producto: 0,
        Nombre_Producto: '',
        Cantidad: 0,
        Monto: 0
    })

    const[ListaSucursales,setListaSucursales]= useState([])
    const[ListaProductosInventario,setListaProductosInventario]= useState([])
    const[MontoDetalleAnterior, setMontoDetalleAnterior]= useState(0)

    const CambioValor = (e) => {
        const { name, value } = e.target;

        let nuevoDetallePedido = {
            ...DetallePedido,
            [name]: (name === "ID_Sucursal" || name === "ID_Producto") ? parseInt(value, 10) : value
        };

        if (name === "ID_Sucursal") {
            nuevoDetallePedido.Cantidad = 0;
            nuevoDetallePedido.Monto = 0;
            obtenerProductosInventario(value);
        }

        if (name === "ID_Producto" || name === "Cantidad") {
            const productoSeleccionado = ListaProductosInventario.find(producto => producto.ID_Producto === nuevoDetallePedido.ID_Producto);
            if (productoSeleccionado) {
                nuevoDetallePedido.Monto = productoSeleccionado.CostoUnitario * nuevoDetallePedido.Cantidad;
            }
        }

        setDetallePedido(nuevoDetallePedido);
    }

    const tituloTexto = props.IdDetallePedidoActual > 0 ? "Editar Detalle Pedido" : "Nuevo Detalle Pedido";

    const ClickBtnGuardar = async() => {
        let URL= props.IdDetallePedidoActual===0 ? `http://localhost:${props.ApiPort}/api/ApiDetallePedido/InsertarDetallePedido` : `http://localhost:${props.ApiPort}/api/ApiDetallePedido/ModificarDetallePedido?ID_Detalle=${props.IdDetallePedidoActual}&Cantidad=${DetallePedido.Cantidad}&Monto=${DetallePedido.Monto}`
        let Method = props.IdDetallePedidoActual===0 ? "POST" : "PATCH"
        try {
            let Result= await fetch(URL,{
                "method":Method,
                "headers":{
                    "content-type":"application/json",
                    "accept":"application/json",
                    "Access-Control-Allow-Origin":"*"
                },
                "body": JSON.stringify(DetallePedido)
            }).then(async response =>{
                if(!response.ok){
                    console.log("No Ok - ClickBtnGuardar")
                    throw new Error (response.statusText)
                }
                return await response.json()
            }).catch(error=>{
                console.log(error)
            })
            
            if(Result.Codigo>=0){
                if (props.IdDetallePedidoActual===0){
                    props.ModificarMontoTotalPedido(props.MontoTotalPedido + DetallePedido.Monto);
                }else{
                    props.ModificarMontoTotalPedido(props.MontoTotalPedido - (MontoDetalleAnterior - DetallePedido.Monto));
                }

                Swal.fire({
                    icon: "success",
                    title: "Información guardada exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                  });
                navigate("/Pedidos/DetallePedido")
            }
            else{
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

    const cargandoFormulario = async () => {
        if (props.IdDetallePedidoActual > 0) {
            let URL = `http://localhost:${props.ApiPort}/api/ApiDetallePedido/ConsultaDetallePedidoxID?ID_Detalle=${props.IdDetallePedidoActual}`
            try {
                let DetallesPedido = await fetch(URL).then(async response => {
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
                if (DetallesPedido.Codigo >= 0) {
                    setDetallePedido(DetallesPedido.Contenido[0]);
                    setMontoDetalleAnterior(DetallesPedido.Contenido[0].Monto);
                    obtenerProductosInventario(DetallesPedido.Contenido[0].ID_Sucursal);
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
                    text: "No se pudo establecer la conexión con el servidor (cargandoFormulario)."
                });
            }                
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

    const obtenerProductosInventario = async (ID_Sucursal) => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiInventario/ConsultaInventarioxSucursal?ID_Sucursal=${ID_Sucursal}`
        try {
            let ProductosInventario = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - obtenerProductosInventario")
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
            if (ProductosInventario.Codigo >= 0) {
                setListaProductosInventario(ProductosInventario.Contenido)
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: ProductosInventario.Mensaje
                    });
                //console.log(ProductosInventario.Mensaje)
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Conexión Inválida",
                text: "No se pudo establecer la conexión con el servidor (fallo al intentar obtener ProductosInventario)."
            });
        }
    }

    useEffect(() => {
        obtenerSucursales();
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
                        <label className="form-label mb-0">Código Detalle Pedido</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <label className="form-label mb-0">{props.IdDetallePedidoActual > 0 ? DetallePedido.ID_Detalle : '-'}</label>
                    </div>
                </div>  
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Código de Pedido</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <label className="form-label mb-0">{props.IdPedidoActual}</label>
                    </div>
                </div>         
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Sucursal</label>
                    </div>
                    <div className="col-12 col-md-4">
                        {props.IdDetallePedidoActual > 0 ?(
                            <label className="form-label mb-0">{DetallePedido.Nombre_Sucursal}</label>
                        ):(
                            <select
                            name="ID_Sucursal"
                            id="ID_Sucursal"
                            className="form-control"
                            value={DetallePedido.ID_Sucursal}
                            onChange={CambioValor}
                            >
                            <option value="0">Seleccionar sucursal</option>
                            {ListaSucursales.map((sucursal) => (
                                <option key={sucursal.ID_Sucursal} value={sucursal.ID_Sucursal}>{sucursal.Nombre_Sucursal}</option>
                            ))}
                        </select>
                        )}                       
                    </div>
                </div> 
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Producto</label>
                    </div>
                    <div className="col-12 col-md-4">
                        {DetallePedido.ID_Sucursal === 0 ? (
                            <label className="form-label mb-0 text-danger">Por favor, seleccione una sucursal.</label>
                        ) : (
                            ListaProductosInventario.length === 0 ? (
                                <label className="form-label mb-0 text-danger">No hay productos con stock en esta sucursal.</label>
                            ) : (
                                props.IdDetallePedidoActual > 0 ?(
                                    (() => {
                                        const productoSeleccionado = ListaProductosInventario.find(producto => producto.ID_Producto === DetallePedido.ID_Producto);
                                        if (productoSeleccionado) {
                                            const stockMensaje = productoSeleccionado.Cantidad > 0 
                                                ? ` (Stock de ${productoSeleccionado.Cantidad})` 
                                                : <span className="text-danger"> (No hay stock disponible)</span>;
                                            return <label className="form-label mb-0">{DetallePedido.Nombre_Producto}{stockMensaje}</label>;
                                        } else {
                                            return <label className="form-label mb-0">{DetallePedido.Nombre_Producto}</label>;
                                        }
                                    })()
                                ):(
                                    <select
                                        name="ID_Producto"
                                        id="ID_Producto"
                                        className="form-control"
                                        value={DetallePedido.ID_Producto}
                                        onChange={CambioValor}
                                        >
                                        <option value="0">Seleccionar producto</option>
                                        {ListaProductosInventario.filter(producto => producto.Cantidad > 0).map((producto) => (
                                            <option key={producto.ID_Producto} value={producto.ID_Producto}>
                                                {producto.Nombre_Producto} (Stock de {producto.Cantidad})
                                            </option>
                                        ))}
                                    </select>
                                )
                            )
                        )}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Cantidad</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="text" className="form-control" name="Cantidad" id="Cantidad" value={DetallePedido.Cantidad} onChange={CambioValor}  disabled={DetallePedido.ID_Sucursal === 0 || DetallePedido.ID_Producto === 0 || ListaProductosInventario.length === 0}/>
                    </div>
                </div> 
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Monto</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <label className="form-label mb-0">{`₡${DetallePedido.Monto.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</label>
                    </div>
                </div>  
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <button className="btn btn-dark w-100" onClick={() => ClickBtnGuardar()}><i className="bi bi-floppy"></i> Guardar</button>
                    </div>
                    <div className="col-12 col-md-2 d-flex justify-content-md-start mt-2 mt-md-0">
                        <button className="btn btn-dark w-100" onClick={() => navigate("/Pedidos/DetallePedido")}><i className="bi bi-arrow-left"></i> Volver</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default LineaDetallePedido;