import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const DetalleCategorias = (props) => {
    const navigate = useNavigate();
    const [Categoria, setCategoria] = useState({
        ID_TipoProducto: 0,
        Descripcion: ''
    })

    const CambioValor = (e) => {
        const { name, type, value, checked } = e.target;
        setCategoria({
            ...Categoria,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    const tituloTexto = props.IdCategoriaActual > 0 ? "Editar Categoria producto" : "Nueva Categoria producto";

    const ClickBtnGuardar = async () => {
        let URL = props.IdCategoriaActual === 0 ? `http://localhost:${props.ApiPort}/api/ApiTipoProducto/InsertarTipoProducto` : `http://localhost:${props.ApiPort}/api/ApiTipoProducto/ModificarTipoProducto`
        let Method = props.IdCategoriaActual === 0 ? "POST" : "PATCH"
        try {
            let Result = await fetch(URL, {
                "method": Method,
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": JSON.stringify(Categoria)
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
                navigate("/TipoProducto/BusquedaCategorias")
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
        if (props.IdCategoriaActual > 0) {
            let URL = `http://localhost:${props.ApiPort}/api/ApiTipoProducto/ConsultaTipoProductoxID?ID_TipoProducto=${props.IdCategoriaActual}`
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
                    setCategoria(Categorias.Contenido[0])
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
    }

    useEffect(() => {
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
                        <label className="form-label mb-0">Nombre de Categoria</label>
                    </div>
                    <div className="col-12 col-md-4">
                        <input type="text" className="form-control" name="Descripcion" id="Descripcion" maxLength="100" value={Categoria.Descripcion} onChange={CambioValor} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                        <button className="btn btn-dark w-100" onClick={() => ClickBtnGuardar()}><i className="bi bi-floppy"></i> Guardar</button>
                    </div>
                    <div className="col-12 col-md-2 d-flex justify-content-md-start mt-2 mt-md-0">
                        <button className="btn btn-dark w-100" onClick={() => navigate("/TipoProducto/BusquedaCategorias")}><i className="bi bi-arrow-left"></i> Salir</button>
                    </div>
                </div>
            </div>
        </div>
    </>

}
export default DetalleCategorias;