import React, { useState } from "react";
import HomePage from "./Home/HomePage";
import BusquedaSucursal from "./Sucursales/BusquedaSucursal";
import DetalleSucursal from "./Sucursales/DetalleSucursal";
import BusquedaTipoEmpleado from "./TipoEmpleado/BusquedaTipoEmpleado";
import DetalleTipoEmpleado from "./TipoEmpleado/DetalleTipoEmpleado";
import BusquedaCategorias from "./TipoProducto/BusquedaCategorias";
import DetalleCategorias from "./TipoProducto/DetalleCategorias"
import BusquedaProveedor from "./Proveedor/BusquedaProveedor";
import DetalleProveedor from "./Proveedor/DetalleProveedor";
import BusquedaProducto from "./Producto/BusquedaProducto";
import DetalleProducto from "./Producto/DetalleProducto";
import BusquedaPedido from "./Pedidos/BusquedaPedido";
import BusquedaDetallePedido from "./DetallePedido/BusquedaDetallePedido";
import LineaDetallePedido from "./DetallePedido/LineaDetallePedido";
import BusquedaInventario from "./Inventario/BusquedaInventario"
import DetalleInventario from "./Inventario/DetalleInventario"
import BusquedaEmpleado from "./Empleado/BusquedaEmpleado";
import DetalleEmpleado from "./Empleado/DetalleEmpleado";
import BusquedaCliente from "./Cliente/BusquedaCliente";
import DetalleCliente from "./Cliente/DetalleCliente";
import Swal from "sweetalert2";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  //PUERTO
  const ApiPort = 81

  const [IdSucursalActual, setIdSucursalActual] = useState(0)
  const CambiarIdSucursal = (item) => {
    setIdSucursalActual(item)
  }
  const [IdTipoEmpleadoActual, setIdTipoEmpleadoActual] = useState(0)
  const CambiarIdTipoEmpleado = (item) => {
    setIdTipoEmpleadoActual(item)
  }
  const [IdCategoriaActual, setIdCategoriaActual] = useState(0)
  const CambiarIdCategoria = (item) => {
    setIdCategoriaActual(item)
  }
  const [IdProveedorActual, setIdProveedorActual] = useState(0)
  const CambiarIdProveedor = (item) => {
    setIdProveedorActual(item)
  }
  const [IdProductoActual, setIdProductoActual] = useState(0)
  const CambiarIdProducto = (item) => {
    setIdProductoActual(item)
  }
  const [IdPedidoActual, setIdPedidoActual] = useState(0)
  const CambiarIdPedido = (item) => {
    setIdPedidoActual(item)
  }
  const [MontoTotalPedido, setMontoTotalPedido] = useState(0)
  const CambiarMontoTotalPedido = (item) => {
    setMontoTotalPedido(item)
  }
  const [IdDetallePedidoActual, setIdDetallePedidoActual] = useState(0)
  const CambiarIdDetallePedido = (item) => {
    setIdDetallePedidoActual(item)
  }
  const [IdInventarioActual, setIdInventarioActual] = useState(0)
  const CambiarIdInventario = (item) => {
    setIdInventarioActual(item)
  }
  const [IdEmpleadoActual, setIdEmpleadoActual] = useState(0)
  const CambiarIdEmpleado = (item) => {
    setIdEmpleadoActual(item)
  }
  const [IdClienteActual, setIdClienteActual] = useState(0)
  const CambiarIdCliente = (item) => {
    setIdClienteActual(item)
  }

  const ModificarMontoTotalPedido = async (NuevoMontoTotal) => {
    let URL = `http://localhost:${ApiPort}/api/ApiPedido/ModificarMontoTotalPedido?ID_Pedido=${IdPedidoActual}&MontoTotal=${NuevoMontoTotal}`;
    try {
        let Result = await fetch(URL, {
            method: 'PATCH'
        }).then(async response => {
            if (!response.ok) {
                console.log("No Ok - ModificarMontoTotalPedido")
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
          CambiarMontoTotalPedido(NuevoMontoTotal);
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

  return (
    <div className="App" >
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Sucursales/BusquedaSucursales" element={<BusquedaSucursal CambiarIdSucursal={CambiarIdSucursal} ApiPort={ApiPort} />} />
            <Route path="/Sucursales/DetalleSucursal" element={<DetalleSucursal IdSucursalActual={IdSucursalActual} ApiPort={ApiPort} />} />
            <Route path="/TiposEmpleado/BusquedaTiposEmpleado" element={<BusquedaTipoEmpleado CambiarIdTipoEmpleado={CambiarIdTipoEmpleado} ApiPort={ApiPort} />} />
            <Route path="/TiposEmpleado/DetalleTipoEmpleado" element={<DetalleTipoEmpleado IdTipoEmpleadoActual={IdTipoEmpleadoActual} ApiPort={ApiPort} />} />
            <Route path="/TipoProducto/BusquedaCategorias" element={<BusquedaCategorias CambiarIdCategoria={CambiarIdCategoria} ApiPort={ApiPort} />} />
            <Route path="/TipoProducto/DetalleCategorias" element={<DetalleCategorias IdCategoriaActual={IdCategoriaActual} ApiPort={ApiPort} />} />
            <Route path="/Producto/BusquedaProducto" element={<BusquedaProducto CambiarIdProducto={CambiarIdProducto} ApiPort={ApiPort} />} />
            <Route path="/Producto/DetalleProducto" element={<DetalleProducto IdProductoActual={IdProductoActual} ApiPort={ApiPort} />} />
            <Route path="/Proveedor/BusquedaProveedor" element={<BusquedaProveedor CambiarIdProveedor={CambiarIdProveedor} ApiPort={ApiPort} />} />
            <Route path="/Proveedor/DetalleProveedor" element={<DetalleProveedor IdProveedorActual={IdProveedorActual} ApiPort={ApiPort} />} />
            <Route path="/Pedidos/BusquedaPedido" element={<BusquedaPedido CambiarIdPedido={CambiarIdPedido} CambiarMontoTotalPedido={CambiarMontoTotalPedido} ApiPort={ApiPort} />} />
            <Route path="/Pedidos/DetallePedido" element={<BusquedaDetallePedido CambiarIdDetallePedido={CambiarIdDetallePedido} CambiarIdPedido={CambiarIdPedido} IdPedidoActual={IdPedidoActual} CambiarMontoTotalPedido={CambiarMontoTotalPedido} MontoTotalPedido={MontoTotalPedido} ModificarMontoTotalPedido={ModificarMontoTotalPedido} ApiPort={ApiPort} />} />
            <Route path="/DetallePedido/LineaDetalle" element={<LineaDetallePedido IdDetallePedidoActual={IdDetallePedidoActual} IdPedidoActual={IdPedidoActual} MontoTotalPedido={MontoTotalPedido} ModificarMontoTotalPedido={ModificarMontoTotalPedido} ApiPort={ApiPort} />} />   
            <Route path="/Inventario/BusquedaInventario" element={<BusquedaInventario CambiarIdInventario={CambiarIdInventario} ApiPort={ApiPort} />} />
            <Route path="/Inventario/DetalleInventario" element={<DetalleInventario IdInventarioActual={IdInventarioActual} ApiPort={ApiPort} />} />
            <Route path="/Empleado/BusquedaEmpleado" element={<BusquedaEmpleado CambiarIdEmpleado={CambiarIdEmpleado} ApiPort={ApiPort} />} />
            <Route path="/Empleado/DetalleEmpleado" element={<DetalleEmpleado IdEmpleadoActual={IdEmpleadoActual} ApiPort={ApiPort} />} />
            <Route path="/Cliente/BusquedaCliente" element={<BusquedaCliente CambiarIdCliente={CambiarIdCliente} ApiPort={ApiPort} />} />
            <Route path="/Cliente/DetalleCliente" element={<DetalleCliente IdClienteActual={IdClienteActual} ApiPort={ApiPort} />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
