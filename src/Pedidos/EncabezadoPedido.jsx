import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

const EncabezadoPedido = (props) => {
  const navigate = useNavigate();
  return <>
    <div style={{ backgroundColor: '#d4d4d4', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '55px', backgroundColor: '#6f9954' }}>
        <h3 style={{ margin: 0, textAlign: 'center', color: "white" }}>Pedidos</h3>
      </header>
      <div className="container mt-3">
        <div className="row mb-3">
          <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
            <button className="btn btn-secondary" onClick={() => navigate("/")}><i className="bi bi-house-door"></i> Home</button>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
            <label className="form-label mb-0">Nombre de Cliente</label>
          </div>
          <div className="col-12 col-md-4">
            <input type="text" className="form-control" name="Nombre_Cliente" id="Nombre_Cliente" value={props.Gestor.Nombre_Cliente} onChange={props.teclaPresionada} />
          </div>
          <div className="col-12 col-md-2 d-flex justify-content-md-start mt-2 mt-md-0">
            <button className="btn btn-dark w-100" onClick={() => props.ClickBtnBuscar()}><i className="bi bi-search"></i> Buscar Pedido</button>
          </div>
          <div className="col-12 col-md-2 d-flex justify-content-md-start mt-2 mt-md-0">
            <button className="btn btn-dark w-100" onClick={() => props.ClickBtnDescargar()}><i className="bi bi-cloud-download"></i> Descargar</button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-3 text-md-right d-flex align-items-center justify-content-md-end">
            <label className="form-label mb-0">Nombre de Empleado</label>
          </div>
          <div className="col-12 col-md-4">
            <input type="text" className="form-control" name="Nombre_Empleado" id="Nombre_Empleado" value={props.Gestor.Nombre_Empleado} onChange={props.teclaPresionada} />
          </div>
          <div className="col-12 col-md-2 d-flex justify-content-md-start mt-2 mt-md-0">
            <button className="btn btn-dark w-100" onClick={() => props.ClickBtnNuevo()}><i className="bi bi-plus-lg"></i> Nuevo Pedido</button>
          </div>
        </div>
      </div>
    </div>
  </>
}
export default EncabezadoPedido;