import React from "react";

const DetalleBusquedaInventario = (props) => {
    return <div style={{ backgroundColor: '#d4d4d4', padding: '20px' }}>
        <div style={{ margin: '0 auto', maxWidth: '90%', overflowX: 'auto' }}>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Detalle</th>                     
                        <th>ID del Inventario</th>                       
                        <th>Nombre de la Sucursal</th>
                        <th>Nombre del producto</th>
                        <th>Cantidad</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {props.ListaInventarios.map((item, i) => {
                        return <tr key={i}>
                            <td><button className="btn btn-success" onClick={() => props.DetallesInventario(item.ID_Inventario)}>Detalles</button></td>
                            <td>{item.ID_Inventario}</td>
                            <td>{item.Nombre_Sucursal}</td>
                            <td>{item.Nombre_Producto}</td>
                            <td>{item.Cantidad}</td>
                            {/* Revisar este boton junto a la logica de borrado en Busqueda Inventario */}
                            <td><button className="btn btn-danger" onClick={() => props.ClickBtnDelete(item.ID_Inventario)}>Eliminar</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div>
}

export default DetalleBusquedaInventario;