import React from "react";

const DetalleBusquedaTipoEmpleado = (props) => {
    return <div style={{ backgroundColor: '#d4d4d4', padding: '20px' }}>
        <div style={{ margin: '0 auto', maxWidth: '90%', overflowX: 'auto' }}>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Detalle</th>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {props.ListaTiposEmpleado.map((item, i) => {
                        return <tr key={i}>
                            <td><button className="btn btn-success" onClick={() => props.DetallesTipoEmpleado(item.ID_TipoEmpleado)}>Detalles</button></td>
                            <td>{item.ID_TipoEmpleado}</td>
                            <td>{item.Descripcion}</td>
                            <td><button className="btn btn-danger" onClick={() => props.ClickBtnDelete(item.ID_TipoEmpleado)}>Eliminar</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div>
}

export default DetalleBusquedaTipoEmpleado;