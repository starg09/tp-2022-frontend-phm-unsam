import { VStack, HStack, Heading, Grid, GridItem, Box } from "@chakra-ui/react"
import { usuariosService } from "../services/usuario.service"
import { useEffect, useState } from "react"

export default function Perfil(props){
    const [datos, set_datos] = useState({})
    const [edad, set_edad] = useState(0)
    /* const datos = {
        foto: "keen.png",
        nombre: "José Antonio",
        apellido: "Gomez",
        edad: "34",
        saldo: "$10000"
    } */
   /*  const datos = usuariosService.getUsuario(props.userId) */
    async function arrancar(){
        console.log(props.userId)
        const llamado = await usuariosService.getUsuario(props.userId)
        console.log(llamado)
        set_datos(llamado)
        set_edad(new Date().getFullYear() - llamado.fechaNacimiento.slice(0,4))
        }
      
    
    useEffect( () => { arrancar() }, {datos})

    return (
        <Grid
        m='2em'
        w='100%'
        h='200px'
        bg='papayawhip'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
        boxShadow='lg'
        >
            <GridItem rowSpan={2} colSpan={1} bg='tomato' m='2'> <img src="keen.png"/> </GridItem>
            <GridItem colSpan={2}> 
                <Box>Nombre</Box>
                <Box bg='white' m='2' p='2' border='1px' borderColor='tomato' >{datos.nombre}</Box>
            </GridItem>
            <GridItem colSpan={2}>
                <Box>Apellido</Box>
                <Box bg='white' m='2' p='2' border='1px' borderColor='tomato' >{datos.apellido}</Box>
            </GridItem>
            <GridItem colSpan={2}>
                <Box>Edad</Box>   
                <Box bg='white' m='2' p='2' border='1px' borderColor='tomato' >{edad}</Box>
            </GridItem>
            <GridItem colSpan={2}>
                <Box>Saldo</Box>    
                <Box bg='white' m='2' p='2' border='1px' borderColor='tomato' >{datos.saldo}</Box>
            </GridItem>
        </Grid>
    )
}