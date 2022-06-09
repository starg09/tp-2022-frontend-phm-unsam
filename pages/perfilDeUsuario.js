import { VStack, Hstack, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import ComprasRealizadas from "../components/comprasRealizadas";
import Perfil from "../components/perfil";


export default function PerfilDeUsuario(){

    const [idUsuario, setIdUsuario] = useState(-1)

    useEffect( async () => {setIdUsuario( localStorage.getItem("user") );}, [])

    return(
        <div className="container">
            {(idUsuario > 0) ? (
                <VStack>
                    <Perfil userId={idUsuario}/>
                    <ComprasRealizadas userId={idUsuario}/>
                </VStack>
            ) : (
                // TODO: Hacer una animacion de cargando aquí.
                <></>
            )}
        </div>
    )
}