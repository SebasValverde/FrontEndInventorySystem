import React from "react";

const TablaDetallePedido = (props) => {
    return <div style={{ backgroundColor: '#d4d4d4', padding: '20px' }}>
    <div style={{ margin: '0 auto', maxWidth: '90%', overflowX: 'auto' }}>
        <table className="table table-striped">
            <thead>
                <tr>
                    { props.EstadoPedido ? (
                        <th>Editar</th>
                    ) : (null)}
                    <th>Nombre Sucursal</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Monto</th>
                    { props.EstadoPedido ? (
                        <th>Eliminar</th>
                    ) : (null)}              
                </tr>
            </thead>
            <tbody>
                {props.ListaDetallesPedido.map((item, i) => {
                    return <tr key={i}>   
                        { props.EstadoPedido ? (
                            <td><button className="btn btn-success" onClick={() => props.LineaDetallePedido(item.ID_Detalle)}>Editar</button></td>   
                        ) : (null)}                 
                        <td>{item.Nombre_Sucursal}</td>
                        <td>{item.Nombre_Producto}</td>
                        <td>{item.Cantidad}</td>
                        <td>{`₡${item.Monto.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</td>
                        { props.EstadoPedido ? (
                            <td><button className="btn btn-danger" onClick={() => props.ClickBtnDelete(item.ID_Detalle, item.Monto)}>Eliminar</button></td>
                        ) : (null)}  
                    </tr>
                })}
            </tbody>
        </table>
    </div>
</div>
}
export default TablaDetallePedido;