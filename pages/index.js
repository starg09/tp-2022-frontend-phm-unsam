import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { productosService } from "../services/productos.service";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";


export default function Home() {
  const [busqueda, setBusqueda] = useState("");

  const [puntaje, setPuntaje] = useState("0");
  const [checkedPaises, setCheckedPaises] = useState([]);
  const [itemsReal, set_itemsReal] = useState([])
  const todosOrigenes = checkedPaises.every(Boolean);
  const algunosOrigenes = checkedPaises.some(Boolean) && !todosOrigenes;

  //TODO: Obtener paises desde el back, incluirlos en la base de datos.
  const listaFiltroPaises = ["Argentina", "Brasil"]


  async function buscarProductos(){
    const llamado = await productosService.filtrarProductos(busqueda, todosOrigenes? [] : listaFiltroPaises.filter((_, n) => checkedPaises[n]), puntaje)
    console.log(llamado)
    set_itemsReal([...llamado])
  }

  function arrancar() {
    const tempChecklist = listaFiltroPaises.map(it => false)
    setCheckedPaises(tempChecklist)
    buscarProductos()
  }


    useEffect( () => { arrancar() }, [] )
    useEffect( () => { buscarProductos() }, [puntaje, checkedPaises] )
    // useEffect( () => console.log(puntaje), [puntaje])

  return (
    <VStack minH="80vh" bg="orange.200">
      <InputGroup w="60%" my={3} size="md" bg="yellow.100" borderRadius="1.5vw">
        <Input
          borderRadius="1.5vw"
          pr="4.5rem"
          type="text"
          placeholder="Buscar"
          value={busqueda}
          onInput={e => setBusqueda(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            colorScheme="blue"
            borderRadius="1.5vw"
            onClick={buscarProductos}
          >
            <SearchIcon/>
          </Button>
        </InputRightElement>
      </InputGroup>
      <HStack alignItems="stretch">
        <Box w="20%" p={3}>
          <VStack
            p={4}
            alignContent="flex-start"
            alignItems="stretch"
            bg="purple.300"
            borderRadius="2vh"
          >
            <Heading textAlign="center">Filtros</Heading>
            <Divider />
            <RadioGroup
              onChange={setPuntaje}
              value={puntaje}
              colorScheme="purple"
            >
              <VStack alignItems="flex-start">
                <Heading size="md" alignSelf="center">
                  Puntaje Mínimo
                </Heading>
                <Radio size="md" value="5">
                  5 Estrellas
                </Radio>
                <Radio size="md" value="4">
                  Desde 4 Estrellas
                </Radio>
                <Radio size="md" value="3">
                  Desde 3 Estrellas
                </Radio>
                <Radio size="md" value="2">
                  Desde 2 Estrellas
                </Radio>
                <Radio size="md" value="0">
                  Todos
                </Radio>
              </VStack>
            </RadioGroup>
            <Divider />
            <Heading size="md" alignSelf="center">
              Origen
            </Heading>
            <Checkbox
              colorScheme="purple"
              isChecked={todosOrigenes}
              isIndeterminate={algunosOrigenes}
              onChange={e => setCheckedPaises(listaFiltroPaises.map(it => e.target.checked))}
            >
              Todos
            </Checkbox>
            <VStack alignItems="flex-start" pl={6} mt={1} spacing={1}>
              {listaFiltroPaises.map( (item, n) =>

                (
                  <Checkbox
                    key={"paises-".concat(n)}
                    colorScheme="purple"
                    isChecked={checkedPaises[n]}
                    onChange={(e) => {
                      const tempChecklist = checkedPaises.map(it => it)
                      tempChecklist[n] = e.target.checked
                      setCheckedPaises(tempChecklist)
                    }
                    }
                  >
                    {item}
                  </Checkbox>
                )
              )}
            </VStack>
            {/* <Button alignSelf="center" colorScheme="purple" onClick={e => console.log(checkedPaises)}>
              Debug: Check state
            </Button> */}
          </VStack>
        </Box>
        <SimpleGrid columns={4} w="80%" maxH="100%" overflowY="auto" p={3}>
          {itemsReal.map((i, id) => (
            <Box
              minH="40vh"
              size="full"
              m={5}
              id={id}
              borderRadius="2vh"
              bg="green.400"
            >
              {/* {console.log(i)} */}
              <VStack my={5} alignItems="flex-start">
                <Image
                  alignSelf="center"
                  w="60%"
                  h="auto"
                  src={i.urlImagenDto ? i.urlImagenDto : ""}
                  fallbackSrc="img_placeholder.png"
                  />
                <Divider py={1} />
                <HStack
                  px={4}
                  my={3}
                  w="full"
                  justifyContent="space-between"
                >
                  <Text fontSize="sm">{i.nombreDto}</Text>
                  <HStack maxW="50%" minH="2em">
                    {[...Array(i.puntajeDto)].map((e, i) => <AiFillStar/>)}
                    {[...Array(5 - i.puntajeDto)].map((e, i) => <AiOutlineStar/>)}
                  </HStack>
                </HStack>
                <Heading alignSelf="center" size="lg">
                  ${i.precioDto}
                </Heading>
                <Text px={4} fontSize="xs">
                  Origen: {i.paisOrigenDto ? i.paisOrigenDto : "Desconocido"}
                </Text>
                <Text px={4} fontSize="sm" fontStyle="italic">
                  {i.descripcionDto}
                </Text>
                <Button alignSelf="center" colorScheme="orange">
                  Detalle
                </Button>
                <Button alignSelf="center" colorScheme="purple">
                  Agregar al carrito
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </HStack>
    </VStack>
  );
}
