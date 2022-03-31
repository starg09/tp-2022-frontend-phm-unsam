import { Heading } from '@chakra-ui/react'

export default function ComprasRealizadas() {
    //traer las compras en una lista
    const compras = [
        {
            orden: "#1",
            fecha: "01/02/2022",
            cantidad: "4",
            importe: "$5073.10"
        },
        {
            orden: "#45",
            fecha: "05/02/2022",
            cantidad: "1",
            importe: "$5962.11"
        }
    ]
    const renderCompras = compras.map( c => 
        <tr>
        <th scope="row">{c.orden}</th>
        <td>{c.fecha}</td>
        <td>{c.cantidad}</td>
        <td>{c.importe}</td>
        </tr>
        )
    return (
        <div class="w-75">
            <Heading size={"md"}>Compras</Heading>
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Orden de compra</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Cantidad de articulos</th>
                    <th scope="col">Importe total</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCompras}
                </tbody>
            </table>
        </div>

    )
}