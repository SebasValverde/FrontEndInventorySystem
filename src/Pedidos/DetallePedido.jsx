import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const DetallePedido = (props) => {
    const navigate = useNavigate();
    const fechaHoy = new Date().toISOString().split('T')[0];
    const [Pedido, setPedido] = useState({
        ID_Pedido: 0,       
        Fecha_Creacion: fechaHoy,
        ID_Cliente: 0,
        ID_Empleado: 0,
        Estado_Orden: true,
        Fecha_Envio: fechaHoy,
        MontoTotal: 0
    })
    
    const[ListaClientes,setListaClientes]= useState([])
    const[ListaEmpleados,setListaEmpleados]= useState([])

    const CambioValor = (e) => {
        const { name, type, value, checked } = e.target;
        setPedido({
            ...Pedido,
            [name]: type === 'checkbox' ? checked : (name === "ID_Cliente" || name === "ID_Empleado" ? parseInt(value, 10) : value)
        });
    }

    const tituloTexto = props.IdPedidoActual > 0 ? "Editar Pedido" : "Nuevo Pedido";

    const ClickBtnGuardar = async() => {     
        let URL= props.IdPedidoActual===0 ? `http://localhost:${props.ApiPort}/api/ApiPedido/InsertarPedido` : `http://localhost:${props.ApiPort}/api/ApiPedido/ModificarPedido`
        let Method = props.IdPedidoActual===0 ? "POST" : "PATCH"
        try {
            let Result= await fetch(URL,{
                "method":Method,
                "headers":{
                    "content-type":"application/json",
                    "accept":"application/json",
                    "Access-Control-Allow-Origin":"*"
                },
                "body": JSON.stringify(Pedido)
            }).then(async response =>{
                if(!response.ok){
                    console.log("No Ok - ClickBtnGuardar")
                    throw new Error (response.statusText)
                }
                return await response.json()
            }).catch(error=>{
                Swal.fire({
                    icon: "error",
                    title: "Error de Ejecución",
                    text: "Ocurrio un problema al intentar ejecutar esta función."
                });
                console.log(error)
            })
            
            if(Result.Codigo>=0){
                if (props.IdPedidoActual===0){   
                    const nuevoID = Result.Contenido.ID_Pedido;               
                    setPedido(prevPedido => ({
                        ...prevPedido,
                        ID_Pedido: nuevoID
                    }));
                    props.CambiarIdPedido(nuevoID);
                }else{
                    props.setEstadoPedido(Pedido.Estado_Orden);
                }
                props.setEditandoPedido(false);
                    
                Swal.fire({
                    icon: "success",
                    title: "Información guardada exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                  });
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
        if (props.IdPedidoActual > 0) {
            let URL = `http://localhost:${props.ApiPort}/api/ApiPedido/ConsultaPedidoxID?ID_Pedido=${props.IdPedidoActual}`
            try {
                let Pedidos = await fetch(URL).then(async response => {
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
                if (Pedidos.Codigo >= 0) {
                    setPedido(Pedidos.Contenido[0])
                    setPedido(prevPedido => ({
                        ...prevPedido,
                        Fecha_Creacion: prevPedido.Fecha_Creacion.split('T')[0],
                        Fecha_Envio: prevPedido.Fecha_Envio.split('T')[0]
                    }));
                    props.CambiarMontoTotalPedido(Pedidos.Contenido[0].MontoTotal);
                    props.setEstadoPedido(Pedidos.Contenido[0].Estado_Orden);
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
    }

    const obtenerClientes = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiCliente/ConsultaCliente?ID_Cliente=`
        try {
            let Clientes = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - obtenerClientes")
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
                setListaClientes(Clientes.Contenido)
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

    const obtenerEmpleados = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiEmpleado/ConsultaEmpleado?ID_Empleado=`
        try {
            let Empleados = await fetch(URL).then(async response => {
                if (!response.ok) {
                    console.log("No Ok - obtenerEmpleados")
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

    useEffect(() => {
        obtenerClientes();
        obtenerEmpleados();
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
                            <button className="btn btn-secondary" onClick={() => navigate("/Pedidos/BusquedaPedido")}><i className="bi bi-arrow-left"></i> Salir</button>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Código de Pedido</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <label className="form-label mb-0">{props.IdPedidoActual > 0 ? Pedido.ID_Pedido : '-'}</label>
                    </div>
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        {props.EditandoPedido ? (
                            <button className="btn btn-dark w-100" onClick={() => ClickBtnGuardar()}><i className="bi bi-floppy"></i> Guardar</button>
                        ) : (
                            props.EstadoPedido ? (
                            <button className="btn btn-dark w-100" onClick={() => props.setEditandoPedido(true)}><i className="bi bi-pencil-square"></i> Editar Encabezado</button>
                            ) : (null)
                        )}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Fecha de Creación</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <label className="form-label mb-0">{Pedido.Fecha_Creacion.split('-').reverse().join('/')}</label>
                    </div>
                    {props.EditandoPedido ? (
                        <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                            <button className="btn btn-dark w-100" onClick={() => props.setEditandoPedido(false)}><i className="bi bi-x-lg"></i> Cancelar</button>  
                        </div>
                    ): null}
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Cliente</label>
                    </div>
                    <div className="col-12 col-md-4">
                        {props.EditandoPedido ? (
                            <select
                            name="ID_Cliente"
                            id="ID_Cliente"
                            className="form-control"
                            value={Pedido.ID_Cliente}
                            onChange={CambioValor}
                            >
                            <option value="0">Seleccionar cliente</option>
                            {ListaClientes.map((cliente) => (
                                <option key={cliente.ID_Cliente} value={cliente.ID_Cliente}>{cliente.Nombre_Cliente}</option>
                            ))}
                        </select>
                        ) : (
                            <label className="form-label mb-0">
                            {
                                ListaClientes.find(cliente => cliente.ID_Cliente === Pedido.ID_Cliente)?.Nombre_Cliente || '-----------'
                            }
                        </label>              
                        )}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Empleado</label>
                    </div>
                    <div className="col-12 col-md-4">
                        {props.EditandoPedido ? (
                            <select
                                name="ID_Empleado"
                                id="ID_Empleado"
                                className="form-control"
                                value={Pedido.ID_Empleado}
                                onChange={CambioValor}
                            >
                                <option value="0">Seleccionar empleado</option>
                                {ListaEmpleados.map((empleado) => (
                                    <option key={empleado.ID_Empleado} value={empleado.ID_Empleado}>{empleado.Nombre_Empleado}</option>
                                ))}
                            </select>
                        ) : (
                            <label className="form-label mb-0">
                                {
                                    ListaEmpleados.find(empleado => empleado.ID_Empleado === Pedido.ID_Empleado)?.Nombre_Empleado || '-----------'                                
                                }
                            </label>
                        )}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Estado Orden</label>
                    </div>
                    <div className="col-12 col-md-4 d-flex align-items-center">
                        {props.EditandoPedido && props.IdPedidoActual > 0 ? (
                            <input type="checkbox" className="form-check-input" name="Estado_Orden" id="Estado_Orden" checked={Pedido.Estado_Orden} onChange={CambioValor} />
                        ) : (
                            <label className="form-label mb-0">
                                {Pedido.Estado_Orden ? "Activo" : "Inactivo"}
                            </label>
                        )}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Fecha de Envío</label>
                    </div>        
                    <div className="col-12 col-md-4">
                        {props.EditandoPedido ? (
                            <input
                                type="date"
                                className="form-control"
                                name="Fecha_Envio"
                                value={Pedido.Fecha_Envio}
                                onChange={CambioValor}
                            />
                        ) : (
                            <label className="form-label mb-0">{Pedido.Fecha_Envio.split('-').reverse().join('/')}</label>
                        )}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Monto Total</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <label className="form-label mb-0">₡ {props.MontoTotalPedido.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</label>
                    </div>
                </div>
            </div>
        </div>
    </>

}
export default DetallePedido;