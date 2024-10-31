import React from "react";

const DetalleBusquedaSucursal = (props) => {
    return <div style={{ backgroundColor: '#d4d4d4', padding: '20px' }}>
        <div style={{ margin: '0 auto', maxWidth: '90%', overflowX: 'auto' }}>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Detalle</th>
                        <th>ID</th>
                        <th>Nombre Sucursal</th>
                        <th>Teléfono</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {props.ListaSucursales.map((item, i) => {
                        return <tr key={i}>
                            <td><button className="btn btn-success" onClick={() => props.DetallesSucursal(item.ID_Sucursal)}>Detalles</button></td>
                            <td>{item.ID_Sucursal}</td>
                            <td>{item.Nombre_Sucursal}</td>
                            <td>{item.Telefono}</td>
                            <td>{item.Descripcion}</td>
                            <td>{item.Estado ? "Activo" : "Inactivo"}</td>
                            <td><button className="btn btn-danger" onClick={() => props.ClickBtnDelete(item.ID_Sucursal)}>Eliminar</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div>
}

export default DetalleBusquedaSucursal;