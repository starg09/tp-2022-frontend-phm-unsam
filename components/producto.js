import { productosService } from "../services/productos.service";
import { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  VStack,
  HStack,
  Grid,
  GridItem,
  Box,
  Image,
  Center,
  Heading,
  Container,
  Button,
  RadioGroup,
  Radio,
  Slider,
  SliderMark,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";

export default function Producto(props) {
  const [datos, set_datos] = useState({puntajeDto: "0"}); //TODO: Buscar solucion alternativa a inicializar este objeto?
  const [loteSeleccionado, setLoteSeleccionado] = useState("");
  const [loteSize, setLoteSize] = useState(1);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

  async function cambiarLoteSeleccionado(lote) {
    const [loteNuevo, tamanio] = lote.split(",");
    // console.log(`[${loteNuevo}] ${tamanio}`)
    setLoteSeleccionado(loteNuevo);
    setLoteSize(tamanio);
    const minimo = await Math.min(tamanio, cantidadSeleccionada);
    // console.log(`${loteSize} - ${cantidadSeleccionada} - ${minimo}`)
    setCantidadSeleccionada(minimo);
  }

  async function arrancar() {
    const llamado = await productosService.productoDetalles(props.id);
    console.log(llamado);
    set_datos(llamado);
    setLoteSeleccionado(llamado.lotesDto[0].numeroLoteDto);
    setLoteSize(llamado.lotesDto[0].cantidadDisponibleDto);
  }

  useEffect(() => {
    arrancar();
  }, []);

  return (
    <Grid
      mx="auto"
      minH="80%"
      templateRows="repeat(5, 1fr)"
      templateColumns="repeat(6, 1fr)"
      border="1px solid papayawhip"
      borderRadius="md"
      boxShadow="lg"
    >
      <GridItem rowSpan={3} colSpan={2} bg="papayawhip">
        <Container my="1em">
          <Image
            src={datos.urlImagenDto ? datos.urlImagenDto : ""}
            fallbackSrc="img_placeholder.png"
            borderColor="black"
            borderWidth="0.2em"
            borderStyle="solid"
          />
        </Container>
      </GridItem>
      <GridItem rowSpan={1} colSpan={2} bg="papayawhip">
        <VStack h="100%" justifyContent="center">
          <Heading>{datos.nombreDto}</Heading>
        </VStack>
      </GridItem>
      <GridItem rowSpan={1} colSpan={2} bg="papayawhip">
        <VStack h="100%" alignItems="flex-start" justifyContent="center">
          <Heading ml="1em" fontStyle="italic" fontWeight="semibold" size="lg">
            ${datos.precioDto}
          </Heading>
        </VStack>
      </GridItem>
      <GridItem rowSpan={2} colSpan={2} bg="papayawhip">
        <Box fontWeight="bold" fontSize="xl" my="1em" mx="2em">
          <HStack maxW="50%" minH="2em">
            {[...Array(datos.puntajeDto)].map((_, n) => (
              <AiFillStar id={`star-${n}`} />
            ))}
            {[...Array(5 - datos.puntajeDto)].map((_, n) => (
              <AiOutlineStar id={`empty-star-${n}`} />
            ))}
          </HStack>
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
        <Center h="full" my="1em">
          <Container>
            <RadioGroup
              onChange={cambiarLoteSeleccionado}
              value={`${loteSeleccionado},${loteSize}`}
            >
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Lote</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Selección</th>
                  </tr>
                </thead>
                <tbody>
                  {datos?.lotesDto?.map((l) => (
                    <tr>
                      <td>{l.numeroLoteDto}</td>
                      <td>
                        <Center>{l.cantidadDisponibleDto}</Center>
                      </td>
                      <td>Disponible</td> {/* TODO: Averiguar del back */}
                      <td>
                        <Center>
                          <Radio
                            borderColor="teal.600"
                            value={`${l.numeroLoteDto},${l.cantidadDisponibleDto}`}
                          ></Radio>
                        </Center>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </RadioGroup>
          </Container>
        </Center>
      </GridItem>
      <GridItem rowSpan={2} colSpan={2} bg="papayawhip">
        <Center h="full">
          <Text color="gray" fontStyle="italic" fontSize="lg">
            {datos.descripcionDto}
          </Text>
        </Center>
      </GridItem>
      <GridItem rowSpan={2} colSpan={3} bg="papayawhip" px={16}>
        <VStack justifyContent="space-evenly" h="100%">
          <Heading size="md">Cantidad a agregar:</Heading>
          {loteSeleccionado && (
            <Slider
              id="slider"
              min={1}
              max={loteSize}
              colorScheme="teal"
              onChange={(v) => setCantidadSeleccionada(v)}
            >
              {[...Array(parseInt(loteSize))].map((_, i) => (
                <SliderMark value={i + 1} mt="3" ml="-2.2" fontSize="sm">
                  {i + 1}
                </SliderMark>
              ))}
              <SliderMark
                value={cantidadSeleccionada}
                textAlign="center"
                bg="blue.500"
                color="white"
                mt="-10"
                ml="-6"
                w="12"
              >
                {cantidadSeleccionada}
              </SliderMark>
              <SliderTrack bg="gray.300">
                <SliderFilledTrack bg="blue.600" />
              </SliderTrack>
              <SliderThumb
                borderWidth={1.5}
                bg="blue.500"
                borderColor="gray.800"
              />
            </Slider>
          )}
        </VStack>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1} bg="papayawhip">
        <VStack h="100%" justifyContent="center">
          <Button
            colorScheme="teal"
            w="170px"
            onClick={async () => await props.funcionCarrito(props.id, datos.lotesDto, loteSeleccionado, cantidadSeleccionada)}
          >
            Agregar al carrito
          </Button>
        </VStack>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1} bg="papayawhip">
        <VStack h="100%" justifyContent="center">
          <Button colorScheme="teal" w="170px">
            Regresar
          </Button>
        </VStack>
      </GridItem>
    </Grid>
  );
}
