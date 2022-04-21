import { productosService } from "../services/productos.service";
import { useState, useEffect } from "react";
import {
  VStack,
  HStack,
  Flex,
  Grid,
  GridItem,
  Box,
  Image,
  Center,
  Heading,
  Container,
  Spacer,
  Button,
} from "@chakra-ui/react";

export default function Producto(props) {
  const [datos, set_datos] = useState({});

  async function arrancar() {
    const llamado = await productosService.productoDetalles(props.id);
    console.log(llamado);
    set_datos(llamado);
  }

  useEffect(() => {
    arrancar();
  }, []);

  return (
    <Grid
      m="2em"
      mx="auto"
      w="70vw"
      h="500px"
      templateRows="repeat(5, 1fr)"
      templateColumns="repeat(6, 1fr)"
      border="1px solid papayawhip"
      borderRadius="md"
      boxShadow="lg"
    >
      <GridItem rowSpan={3} colSpan={2} bg="papayawhip">
        <Container my="1em">
          <Image src="keen.png" />
        </Container>
      </GridItem>
      <GridItem rowSpan={1} colSpan={4} bg="papayawhip">
        <Heading mt="1em" ml="1em">
          ${datos.precioDto}
        </Heading>
      </GridItem>
      <GridItem rowSpan={2} colSpan={2} bg="papayawhip">
        <Box fontWeight="bold" fontSize="xl" my="1em" mx="2em">
          {datos.puntajeDto} Estrellas
          <br />
          Origen: {datos.paisOrigenDto}
          <br />
          Tipo: {datos.tipoDto}
          <br />
          Medidas: {datos.medidasDto}
          <br />
          Terminacion: {datos.terminacionDto}
        </Box>
      </GridItem>
      <GridItem rowSpan={2} colSpan={2} bg="papayawhip">
        <Box my="1em">
          <Container>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">lote</th>
                  <th scope="col">cantidad</th>
                  <th scope="col">stock</th>
                </tr>
              </thead>
              <tbody>
                {datos?.lotesDto?.map((l) => (
                  <tr>
                    <td>{l.cantidadDisponibleDto}</td>
                    <td>{l.numeroLoteDto}</td>
                    <td>Disponible</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Container>
        </Box>
      </GridItem>
      <GridItem rowSpan={1} colSpan={2} bg="papayawhip">
        <Heading mt="0.5em">
          <Center>{datos.nombreDto}</Center>
        </Heading>
      </GridItem>
      <GridItem rowSpan={1} colSpan={3} bg="papayawhip">
        <Box></Box>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1} bg="papayawhip">
        <Button colorScheme="teal" mt="2em" w="170px">
          Agregar al carrito
        </Button>
      </GridItem>
      <GridItem rowSpan={1} colSpan={2} bg="papayawhip">
        <Box>
          <Center color="gray">{datos.descripcionDto}</Center>
        </Box>
      </GridItem>
      <GridItem rowSpan={1} colSpan={3} bg="papayawhip">
        <Box></Box>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1} bg="papayawhip">
        <Button colorScheme="teal" w="170px">
          Regresar
        </Button>
      </GridItem>
    </Grid>
  );
}
