import React from "react";
//style={{ backgroundColor: '#c1c1c1',padding: '20px' }}
const DetalleBusquedaProveedor = (props) => {
    return <div style={{ backgroundColor: '#d4d4d4', padding: '20px' }}>
        <div style={{ margin: '0 auto', maxWidth: '90%', overflowX: 'auto', }}>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Detalle</th>
                        <th>ID Proveedor</th>
                        <th>Nombre de Proveedor</th>
                        <th>Telefono</th>
                        <th>Direccion</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {props.ListaProveedores.map((item, i) => {
                        return <tr key={i}>
                            <td><button className="btn btn-success" onClick={() => props.DetalleProveedor(item.ID_Proveedor)}>Detalles</button></td>
                            <td>{item.ID_Proveedor}</td>
                            <td>{item.Nombre_Proveedor}</td>
                            <td>{item.Telefono}</td>
                            <td>{item.Direccion}</td>                        
                            <td><button className="btn btn-danger" onClick={() => props.ClickBtnDelete(item.ID_Proveedor)}>Eliminar</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div>
}

export default DetalleBusquedaProveedor;