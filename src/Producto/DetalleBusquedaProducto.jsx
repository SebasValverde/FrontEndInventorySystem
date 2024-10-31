import React from "react";
const DetalleBusquedaProducto = (props) => {

    const formatFecha = (fecha) => {
        if (!fecha) return ''; // Maneja el caso en que la fecha no esté definida
        const date = new Date(fecha);
        return date.toLocaleDateString(); // Puedes personalizar el formato según tu preferencia
    };
    return <div style={{ backgroundColor: '#d4d4d4', padding: '20px' }} >
        <div style={{ margin: '0 auto', maxWidth: '90%', overflowX: 'auto' }}>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Detalle</th>
                        <th>Codigo</th>
                        <th>Nombre Producto</th>
                        <th>Descripcion</th>
                        <th>Categoria</th>
                        <th>Proveedor</th>
                        <th>Fecha de caducidad</th>
                        <th>Precio Unitario</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {props.ListaProductos.map((item, i) => {
                        return <tr key={i}>
                            <td><button className="btn btn-success" onClick={() => props.DetalleProducto(item.ID_Producto)}>Detalles</button></td>
                            <td>{item.ID_Producto}</td>
                            <td>{item.Nombre_Producto}</td>
                            <td>{item.Descripcion}</td>
                            <td>{item.Tipo_Producto}</td>
                            <td>{item.Nombre_Proveedor}</td>
                            <td>{formatFecha(item.Fecha_Caducidad)}</td>
                            <td>{item.CostoUnitario}</td>
                            <td><button className="btn btn-danger" onClick={() => props.ClickBtnDelete(item.ID_Producto)}>Eliminar</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div>
}

export default DetalleBusquedaProducto;