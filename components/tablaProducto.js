import { Heading } from "@chakra-ui/react"

export default function TablaProducto(){
    const lotes = [
        {
            lote: "2222",
            cantidad: "2",
            seleccion: "false"
        },
        {
            lote: "3672",
            cantidad: "3",
            seleccion: "false"
        },
        {
            lote: "6543",
            cantidad: "2",
            seleccion: "true"
        },
        {
            lote: "2342",
            cantidad: "2",
            seleccion: "false"
        }
    ]
    const renderLotes = lotes.map( c => 
        <tr>
        <th scope="row">{c.lote}</th>
        <td>{c.cantidad}</td>
        <td><input type="checkbox" checked={c.seleccion === 'true'}/></td>
        </tr>
        )
    return (
        <div className="w-75 m-auto">
            <Heading size={"md"}>Compras</Heading>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">lote</th>
                    <th scope="col">cantidad</th>
                    <th scope="col">seleccion</th>
                    </tr>
                </thead>
                <tbody>
                    {renderLotes}
                </tbody>
            </table>
        </div>
    )
}