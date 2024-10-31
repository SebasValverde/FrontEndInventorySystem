import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const DetalleProducto = (props) => {
    const navigate = useNavigate();
    const [Producto, setProducto] = useState({
        ID_Producto: 0,
        Nombre_Producto: '',
        Descripcion: '',
        ID_TipoProducto: '',
        Fecha_Caducidad: '',
        ID_Proveedor: '',
        CostoUnitario: '',
    })

    const CambioValor = (e) => {
        const { name, value } = e.target;
        setProducto({
            ...Producto,
            [name]: value
        });
    };




    const tituloTexto = props.IdProductoActual > 0 ? "Editar Producto" : "Nuevo Producto";

    const ClickBtnGuardar = async () => {
        let URL = props.IdProductoActual === 0 ? `http://localhost:${props.ApiPort}/api/ApiProducto/InsertarProducto` : `http://localhost:${props.ApiPort}/api/ApiProducto/ModificarProducto`
        let Method = props.IdProductoActual === 0 ? "POST" : "PATCH"
        try {
            let Result = await fetch(URL, {
                "method": Method,
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": JSON.stringify(Producto)
            }).then(async response => {
                if (!response.ok) {
                    console.log("No Ok")
                    throw new Error(response.statusText)
                }
                return await response.json()
            }).catch(error => {
                console.log(error)
            })

            if (Result.Codigo >= 0) {
                Swal.fire({
                    icon: "success",
                    title: "Información guardada exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/Producto/BusquedaProducto")
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

    const cargandoFormulario = async () => {
        if (props.IdProductoActual > 0) {
            let URL = `http://localhost:${props.ApiPort}/api/ApiProducto/ConsultaProducto?ID_Producto=${props.IdProductoActual}`
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
                    setProducto(Productos.Contenido[0])
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: Productos.Mensaje
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
    }

    const [ListaTP, setListaTP] = useState([])
    const Categorias = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiTipoProducto/ConsultaTipoPNombre?Categoria=${Producto.ID_TipoProducto}`;
        try {
            let response = await fetch(URL);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            let Categorias = await response.json();
            if (Categorias.Codigo >= 0) {
                setListaTP(Categorias.Contenido);
                console.log(Categorias.Contenido)
            } else {
                console.log(Categorias.Mensaje);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [ListaProveedores, setListaProveedores] = useState([]);

    const Proveedores = async () => {
        let URL = `http://localhost:${props.ApiPort}/api/ApiProveedor/ConsultaProveedorNombre?Nombre=` + Producto.ID_Proveedor;
        let Proveedores = await fetch(URL).then(async response => {
            if (!response.ok) {
                console.log("No Ok");
                throw new Error(response.statusText);
            }
            return await response.json();
        }).catch(error => {
            console.log(error);
        });
        if (Proveedores.Codigo >= 0) {
            setListaProveedores(Proveedores.Contenido);
        } else {
            console.log(Proveedores.Mensaje);
        }
    };

    useEffect(() => {
        cargandoFormulario();
        Categorias();
        Proveedores();
        //eslint-disable-next-line
    }, [])

    return <>
        <div style={{ backgroundColor: '#d4d4d4', padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '55px', backgroundColor: '#6f9954' }}>
                <h3 style={{ margin: 0, textAlign: 'center', color: "white" }}>{tituloTexto}</h3>
            </header>
            <div className="container mt-3">
                {/* Nombre del Producto */}
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Nombre del Producto</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="text" className="form-control" name="Nombre_Producto" id="Nombre_Producto" maxLength="100" value={Producto.Nombre_Producto} onChange={CambioValor} />
                    </div>
                </div>
                {/* Descripción */}
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Descripción</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <textarea className="form-control" name="Descripcion" id="Descripcion" maxLength="200" rows="3" value={Producto.Descripcion} onChange={CambioValor}></textarea>
                    </div>
                </div>
                {/* Categoria <option value="0">Seleccionar Categoria</option>*/}
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Categoria</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <select className="form-select" name="ID_TipoProducto" id="ID_TipoProducto" onChange={CambioValor} value={Producto.ID_TipoProducto}>
                            <option value="0">Seleccionar Categoria</option>
                            {ListaTP.map((item, i) => (
                                <option key={i} value={item.ID_TipoProducto}>{item.Descripcion}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Fecha de Caducidad */}
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Fecha de Caducidad</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="date" className="form-control" name="Fecha_Caducidad" id="Fecha_Caducidad" value={Producto.Fecha_Caducidad} onChange={CambioValor} />
                    </div>
                </div>
                {/* Proveedor <option value="0">Seleccionar Proveedor</option>*/}
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Proveedor</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <select className="form-select" name="ID_Proveedor" id="ID_Proveedor" onChange={CambioValor} value={Producto.ID_Proveedor}>
                            <option value="0">Seleccionar proveedor</option>
                            {ListaProveedores.map((item, i) => (
                                <option key={i} value={item.ID_Proveedor}>{item.Nombre_Proveedor}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Costo Unitario */}
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <label className="form-label mb-0">Costo Unitario</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="text" className="form-control" name="CostoUnitario" id="CostoUnitario" value={Producto.CostoUnitario} onChange={CambioValor} />
                    </div>
                </div>
                {/* Botones Guardar y Salir */}
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <button className="btn btn-dark w-100" onClick={() => ClickBtnGuardar()}><i className="bi bi-floppy"></i> Guardar</button>
                    </div>
                    <div className="col-12 col-md-2 d-flex justify-content-md-start mt-2 mt-md-0">
                        <button className="btn btn-dark w-100" onClick={() => navigate("/Producto/BusquedaProducto")}><i className="bi bi-arrow-left"></i> Salir</button>
                    </div>
                </div>
            </div>
        </div>
    </>



}
export default DetalleProducto;