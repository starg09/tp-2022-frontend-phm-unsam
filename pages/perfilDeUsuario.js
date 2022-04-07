import { VStack, Hstack, Heading } from "@chakra-ui/react"
import ComprasRealizadas from "../components/comprasRealizadas";
import Perfil from "../components/perfil";


export default function PerfilDeUsuario(){
    return(
        <div class="container">
            <VStack>
                <Perfil userId={1}/>
                <ComprasRealizadas userId={1}/>
            </VStack>
        </div>
    )
}