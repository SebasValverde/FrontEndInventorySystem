import React from "react";
//style={{ backgroundColor: '#c1c1c1',padding: '20px' }}
const DetalleBusquedaEmpleado = (props) => {
    return <div style={{ backgroundColor: '#d4d4d4', padding: '20px' }}>
        <div style={{ margin: '0 auto', maxWidth: '90%', overflowX: 'auto', }}>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Detalle</th>
                        <th>ID Empleado</th>
                        <th>Nombre del Empleado</th>
                        <th>Tipo Empleado</th>
                        <th>Correo</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {props.ListaEmpleados.map((item, i) => {
                        return <tr key={i}>
                            <td><button className="btn btn-success" onClick={() => props.DetalleEmpleado(item.ID_Empleado)}>Detalles</button></td>
                            <td>{item.ID_Empleado}</td>
                            <td>{item.Nombre_Empleado}</td>
                            <td>{item.Nombre_Descripcion_TE}</td>
                            <td>{item.Correo_Empleado}</td>                        
                            <td><button className="btn btn-danger" onClick={() => props.ClickBtnDelete(item.ID_Empleado)}>Eliminar</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div>
}

export default DetalleBusquedaEmpleado;