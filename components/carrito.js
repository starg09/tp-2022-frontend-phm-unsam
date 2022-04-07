import { Box, Heading, Flex, Spacer, Button } from "@chakra-ui/react"
import { BsFillTrashFill } from "react-icons/bs"
import { useState, useEffect } from 'react'
import { usuariosService } from "../services/usuario.service"
import { useRouter } from "next/router"

export default function Carrito(props){
    const [carro, set_carro] = useState([])
    const router = useRouter()
    /* const datos = {
        foto: "keen.png",
        nombre: "José Antonio",
        apellido: "Gomez",
        edad: "34",
        saldo: "$10000"
    } */
   /*  const datos = usuariosService.getUsuario(props.userId) */
    async function arrancar(){
        const llamado = await usuariosService.getCarrito(props.userId)
        console.log(llamado)
        set_carro(llamado)
        }

        
    async function vaciar(){
        let confirmacion = confirm("Esta seguro de eliminar el carrito?")
        if ( confirmacion == true) {
            await usuariosService.vaciarCarrito(props.userId)
            router.reload()
            }
        }
    
    useEffect( () => { arrancar() }, [])
    /* const carro = [
        {
            producto: "Acme Rustico",
            descripcion: "Porcelanato rustico marca Acme",
            lote: "2222",
            cantidad: "2",
            precio: "$5073.10"
        },
        {
            producto: "Acme Arena",
            descripcion: "Porcelanato arena marca Acme",
            lote: "5435",
            cantidad: "3",
            precio: "$5962.11"
        }] */

    return(
        <Box
        w='75%'
        mx='auto'
        my='2em'
        >
            <Heading my='1em'>
                Carrito De Compras
            </Heading>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Lote</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {carro?.map( c => 
                        <tr>
                        <th scope="row">{c.nombre}</th>
                        <td>{c.descripcion}</td>
                        <td>{c.lote}</td>
                        <td>{c.cantidad}</td>
                        <td>{c.precio}</td>
                        <td><button><BsFillTrashFill /></button></td>
                        </tr>
                        )}
                </tbody>
            </table>
            <Flex>
                <Spacer />
                <Box p='4' >
                    <Button colorScheme="teal" onClick={() => vaciar()}>Limpiar el carrito</Button>
                </Box>
                <Box p='4' >
                    <Button colorScheme='teal'>Comprar</Button>
                </Box>
            </Flex>
        </Box>
    )
}