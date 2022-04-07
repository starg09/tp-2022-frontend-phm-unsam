import { Heading } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { usuariosService } from '../services/usuario.service'

export default function ComprasRealizadas(props) {
    //traer las compras en una lista
    const [compras, set_compras] = useState([])
    const [renderCompras, set_renderCompras] = useState([])
    let [loaded, set_loaded] = useState(false)
    /* const compras = [
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
    ] */

    async function arrancar(){
        const llamado = await usuariosService.comprasUsuario(props.userId)
        set_compras([...llamado])
        const renderComprasComponent = compras.map( c => 
            <tr>
            <th scope="row">{c.ordenCompra}</th>
            <td>{c.fechaCompra}</td>
            <td>{c.cantidad}</td>
            <td>{c.importe}</td>
            </tr>
            )
        set_renderCompras([...renderComprasComponent])
    }
    
    useEffect( async() => { 
        if(!loaded){
            await arrancar()
            set_loaded(true)
            } 
        })
    
    /* const renderCompras = compras.map( c => 
        <tr>
        <th scope="row">{c.orden}</th>
        <td>{c.fecha}</td>
        <td>{c.cantidad}</td>
        <td>{c.importe}</td>
        </tr>
        ) */
    return (
        <div className="w-75"> 
            <Heading size={"md"}>Compras</Heading>
            <table className="table table-striped">
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