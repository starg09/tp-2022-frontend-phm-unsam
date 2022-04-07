import { VStack, Hstack, Heading } from "@chakra-ui/react"
import Carrito from "../components/carrito";
import ComprasRealizadas from "../components/comprasRealizadas";
import Perfil from "../components/perfil";


export default function CarritoUsuario(){
    return(
        <Carrito userId={1}/>
    )
}