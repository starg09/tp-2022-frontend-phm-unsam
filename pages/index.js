import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  createStandaloneToast,
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
import { usuariosService } from "../services/usuario.service";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";


export default function Home() {
  const [puntaje, setPuntaje] = useState("0");

  //TODO: Generar este estado en base a mock data (y luego al backend).
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const [itemsReal, set_itemsReal] = useState([])
  const todosOrigenes = checkedItems.every(Boolean);
  const algunosOrigenes = checkedItems.some(Boolean) && !todosOrigenes;

  const toast = createStandaloneToast()

/*   const itemsTemp = [
    {
      id: 1,
      nombre: "Acme rústico",
      imagen: "",
      puntaje: 2,
      precio: 2536.55,
      origen: "Argentina",
      descripcion: "Porcelanato rústico marca Acme semi satinado 36 x 36",
    },
    {
      id: 2,
      nombre: "Acme arena",
      imagen: "",
      puntaje: 3,
      precio: 1987.37,
      origen: "Argentina",
      descripcion: "Porcelanato arena marca Acme semi satinado 36 x 36",
    },
    {
      id: 3,
      nombre: "Acme beteado",
      imagen: "",
      puntaje: 1,
      precio: 2996.99,
      origen: "Argentina",
      descripcion: "Porcelanato beteado marca Acme satinado 36 x 36",
    },
    {
      id: 4,
      nombre: "Adla blanco",
      imagen: "",
      puntaje: 4,
      precio: 8836.77,
      origen: "Argentina",
      descripcion: "Pintura para interiores color rojo marca Adla x 20 litros",
    },
    {
      id: 5,
      nombre: "Acme rústico dark",
      imagen: "",
      puntaje: 4,
      precio: 2536.55,
      origen: "Argentina",
      descripcion:
        "Porcelanato rústico oscuro marca Acme semi satinado 36 x 36",
    },
  ]; */

  async function arrancar(){
    const llamado = await productosService.getProductos()
    console.log(llamado)
    set_itemsReal([...llamado])
    }
  /* 
  class AgregarCarritoDTO(
    var idProducto: Int, 
    var idUsuario: Int, 
    var cantidad: Int, 
    var loteNumero: Int)  

    abstract class ProductoDTO {
    var nombreDto: String = ""
    var descripcionDto: String= ""
    var puntajeDto: Int = 0
    var paisOrigenDto: String = ""
    var precioDto: Double = 0.0
    var lotesDto = listOf<LoteDTO>()
    var idDto: Int = 0
}
    */
  async function agregarAlCarrito(idProducto, listaLotes = []){
    //Buscar lote con cantidad
    debugger
    const lote = listaLotes.find( l => l.cantidadDisponibleDto > 0 )
    const idUsuario = localStorage.getItem("user") //FIXME: optimizar manejo de errores
    if(lote == undefined || idUsuario === null){
      toast({
        title: 'An error occurred.',
        description: 'no hay lote disponible o no esta logueado',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    else{
      const agregable = {
        idProducto: idProducto, 
        idUsuario: idUsuario, 
        cantidad: 1, 
        loteNumero: lote.numeroLoteDto
      }
      await usuariosService.agregarAlCarrito(agregable)
      toast({
        title: 'agregado al carrito',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  useEffect( () => { arrancar() }, [] )

  return (
    <VStack minH="80vh" bg="orange.200">
      <InputGroup w="60%" my={3} size="md" bg="yellow.100" borderRadius="1.5vw">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Buscar" borderRadius="1.5vw"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" colorScheme="blue" borderRadius="1.5vw">
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
                  Puntaje
                </Heading>
                <Radio size="md" value="5">
                  5 puntos
                </Radio>
                <Radio size="md" value="4">
                  4 o más puntos
                </Radio>
                <Radio size="md" value="3">
                  3 o más puntos
                </Radio>
                <Radio size="md" value="2">
                  2 o más puntos
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
              onChange={(e) =>
                setCheckedItems([e.target.checked, e.target.checked])
              }
            >
              Todos
            </Checkbox>
            <VStack alignItems="flex-start" pl={6} mt={1} spacing={1}>
              <Checkbox
                colorScheme="purple"
                isChecked={checkedItems[0]}
                onChange={(e) =>
                  setCheckedItems([e.target.checked, checkedItems[1]])
                }
              >
                Argentina
              </Checkbox>
              <Checkbox
                colorScheme="purple"
                isChecked={checkedItems[1]}
                onChange={(e) =>
                  setCheckedItems([checkedItems[0], e.target.checked])
                }
              >
                Brasil
              </Checkbox>
            </VStack>
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
              {console.log(i)}
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
                <Button alignSelf="center" colorScheme="purple" onClick={async () => await agregarAlCarrito(i.idDto, i.lotesDto)}>
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
