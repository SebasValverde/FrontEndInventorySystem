import React from "react";

const DetalleBusquedaPedido = (props) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatCurrency = (amount) => {
        return `₡${amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    };

    return <div style={{ backgroundColor: '#d4d4d4', padding: '20px' }}>
    <div style={{ margin: '0 auto', maxWidth: '90%', overflowX: 'auto' }}>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Detalle</th>
                    <th>Nombre Cliente</th>
                    <th>Nombre Empleado</th>
                    <th>Estado Orden</th>
                    <th>Fecha Envio</th>
                    <th>MontoTotal</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {props.ListaPedidos.map((item, i) => {
                    return <tr key={i}>
                        <td><button className="btn btn-success" onClick={() => props.DetallesPedido(item.ID_Pedido)}>Detalles</button></td>
                        <td>{item.Nombre_Cliente}</td>
                        <td>{item.Nombre_Empleado}</td>
                        <td>{item.Estado_Orden ? "Activo" : "Inactivo"}</td>
                        <td>{formatDate(item.Fecha_Envio)}</td>
                        <td>{formatCurrency(item.MontoTotal)}</td>
                        <td><button className="btn btn-danger" onClick={() => props.ClickBtnDelete(item.ID_Pedido)}>Eliminar</button></td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
</div>
}
export default DetalleBusquedaPedido;