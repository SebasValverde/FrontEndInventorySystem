import React from "react";
const DetalleBusquedaCategorias = (props) => {
    return <div style={{ backgroundColor: '#d4d4d4', padding: '20px' }} >
        <div style={{ margin: '0 auto', maxWidth: '90%', overflowX: 'auto' }}>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Detalle</th>
                        <th>ID Categoria</th>
                        <th>Nombre de Categoria</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {props.ListaCategorias.map((item, i) => {
                        return <tr key={i}>
                            <td><button className="btn btn-success" onClick={() => props.DetalleCategorias(item.ID_TipoProducto)}>Detalles</button></td>
                            <td>{item.ID_TipoProducto}</td>
                            <td>{item.Descripcion}</td>
                            <td><button className="btn btn-danger" onClick={() => props.ClickBtnDelete(item.ID_TipoProducto)}>Eliminar</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div>
}

export default DetalleBusquedaCategorias;