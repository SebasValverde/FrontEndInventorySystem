import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../img/FondoInicio.jpg';
import '../css/styleshome.css';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#7da660';
      });
      button.addEventListener('mouseout', () => {
        button.style.backgroundColor = '#8fbf70';
      });
    });
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener('mouseover', () => { });
        button.removeEventListener('mouseout', () => { });
      });
    };
  }, []);

  return (
    <div className="home-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="content-box">
        <h1 className="heading">Bienvenido</h1>
        <p className="paragraph">Selecciona una opción:</p>
        <button className="button" onClick={() => navigate("/Inventario/BusquedaInventario")}>Inventario</button>
        <button className="button" onClick={() => navigate("/Pedidos/BusquedaPedido")}>Pedidos</button>
        <button className="button" onClick={() => navigate("/Producto/BusquedaProducto")}>Producto</button>
        <button className="button" onClick={() => navigate("/TipoProducto/BusquedaCategorias")}>Tipos de Productos</button>
        <button className="button" onClick={() => navigate("/Empleado/BusquedaEmpleado")}>Empleado</button>
        <button className="button" onClick={() => navigate("/TiposEmpleado/BusquedaTiposEmpleado")}>Tipos de Empleados</button>
        <button className="button" onClick={() => navigate("/Cliente/BusquedaCliente")}>Cliente</button>
        <button className="button" onClick={() => navigate("/Sucursales/BusquedaSucursales")}>Sucursales</button>
        <button className="button" onClick={() => navigate("/Proveedor/BusquedaProveedor")}>Proveedor</button>
      </div>
    </div>
  );
}

export default HomePage;
