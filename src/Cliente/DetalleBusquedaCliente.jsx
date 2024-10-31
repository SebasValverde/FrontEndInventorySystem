import React from "react";

const DetalleBusquedaCliente = (props) => {
    return <div style={{ backgroundColor: '#d4d4d4', padding: '20px' }}>
        <div style={{ margin: '0 auto', maxWidth: '90%', overflowX: 'auto' }}>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Detalle</th>
                        <th>ID</th>
                        <th>Nombre del Cliente</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {props.ListaCliente.map((item, i) => {
                        return <tr key={i}>
                            <td><button className="btn btn-success" onClick={() => props.DetalleCliente(item.ID_Cliente)}>Detalles</button></td>
                            <td>{item.ID_Cliente}</td>
                            <td>{item.Nombre_Cliente}</td>
                            <td>{item.Telefono}</td>
                            <td>{item.Direccion}</td>
                            <td><button className="btn btn-danger" onClick={() => props.ClickBtnDelete(item.ID_Cliente)}>Eliminar</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div>
}

export default DetalleBusquedaCliente;