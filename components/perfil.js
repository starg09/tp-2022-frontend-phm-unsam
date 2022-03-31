import { VStack, HStack, Heading, Grid, GridItem, Box } from "@chakra-ui/react"

export default function Perfil(){
    const datos = {
        foto: "keen.png",
        nombre: "José Antonio",
        apellido: "Gomez",
        edad: "34",
        saldo: "$10000"
    }
    return (
        <Grid
        m='2em'
        w='100%'
        h='200px'
        bg='papayawhip'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
        >
            <GridItem rowSpan={2} colSpan={1} bg='tomato' m='2'> <img src={datos.foto}/> </GridItem>
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
                <Box bg='white' m='2' p='2' border='1px' borderColor='tomato' >{datos.edad}</Box>
            </GridItem>
            <GridItem colSpan={2}>
                <Box>Saldo</Box>    
                <Box bg='white' m='2' p='2' border='1px' borderColor='tomato' >{datos.saldo}</Box>
            </GridItem>
        </Grid>
    )
}