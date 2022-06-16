import { VStack, Hstack, Heading } from "@chakra-ui/react"
import ComprasRealizadas from "../components/comprasRealizadas";
import Perfil from "../components/perfil";


export default function PerfilDeUsuario(){
    return(
        <div className="container">
            <VStack>
                <Perfil userId={1}/>
                <ComprasRealizadas userId={1}/>
            </VStack>
        </div>
    )
}