import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

const EncabezadoDetallePedido = (props) => {
  return <>
    { props.IdPedidoActual > 0 ? (
        <div style={{ backgroundColor: '#d4d4d4', padding: '20px' }}>
            
            <div className="container mt-3">
                { props.EstadoPedido ? (
                <div className="row mb-3">
                    <div className="col-12 col-md-2 d-flex justify-content-md-start mt-2 mt-md-0">
                        <button className="btn btn-dark w-100" onClick={() => props.ClickBtnNuevo()}><i className="bi bi-plus-lg"></i> Agregar Producto</button>
                    </div>
                </div>
                ) : (null)}
            </div>
            <div className="row mb-3">
                <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                    <label className="form-label mb-0">Nombre Producto</label>
                </div>
                <div className="col-12 col-md-4">
                    <input type="text" className="form-control" name="Nombre_Producto" id="Nombre_Producto" value={props.Gestor.Nombre_Producto} onChange={props.teclaPresionada} />
                </div>
            </div>  
            <div className="row mb-3">    
                <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
                    <label className="form-label mb-0">Nombre Sucursal</label>
                </div>
                <div className="col-12 col-md-4">
                    <input type="text" className="form-control" name="Nombre_Sucursal" id="Nombre_Sucursal" value={props.Gestor.Nombre_Sucursal} onChange={props.teclaPresionada} />
                </div>
                <div className="col-12 col-md-2 d-flex justify-content-md-start mt-2 mt-md-0">
                    <button className="btn btn-dark w-100" onClick={() => props.ClickBtnBuscar()}><i className="bi bi-search"></i> Buscar Detalle Pedido</button>
                </div>
                <div className="col-12 col-md-2 d-flex justify-content-md-start mt-2 mt-md-0">
                    <button className="btn btn-dark w-100" onClick={() => props.ClickBtnDescargar()}><i className="bi bi-cloud-download"></i> Descargar</button>
                </div>  
            </div>     
        </div>
    ) : (null)}   
  </>
}
export default EncabezadoDetallePedido;