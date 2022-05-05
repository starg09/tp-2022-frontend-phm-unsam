import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Checkbox,
  createStandaloneToast,
  Divider,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
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
import { MdOutlineReportGmailerrorred } from "react-icons/md"
import { authService } from "../services";
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter();

  const [itemsReal, set_itemsReal] = useState([])

  const [busqueda, setBusqueda] = useState("");
  const [puntaje, setPuntaje] = useState("0");

  //TODO: Obtener paises desde el back, incluirlos en la base de datos.
  const listaFiltroPaises = ["Argentina", "Brasil"]

  const [checkedPaises, setCheckedPaises] = useState(listaFiltroPaises.map(it => false));
  const todosOrigenes = checkedPaises.every(Boolean);
  const algunosOrigenes = checkedPaises.some(Boolean) && !todosOrigenes;
  const toast = createStandaloneToast()



  async function buscarProductos(){
    const llamado = await productosService.filtrarProductos(busqueda, todosOrigenes? [] : listaFiltroPaises.filter((_, n) => checkedPaises[n]), puntaje)
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
    if (!authService.isAuthenticated()) {
      toast({
        title: (<Text><Link color="yellow" textDecoration="underline" onClick={() => {
          toast.closeAll()
          router.push("/login")
        }}>Inicie sesión</Link> para usar el carrito.</Text>),
        description: "Necesita una cuenta para ingresar.",
        status: 'warning',
        duration: 20000,
        isClosable: true,
      })
    } else {
      const errores = []
      //Buscar lote con cantidad
      const lote = listaLotes.find( l => l.cantidadDisponibleDto > 0 )
      if (lote == undefined) errores.push("No hay lotes disponibles para este producto.")
      if (errores.length == 0) {
        const idUsuario = localStorage.getItem("user")
        const agregable = {
          idProducto: idProducto,
          idUsuario: idUsuario,
          cantidad: 1,
          loteNumero: lote.numeroLoteDto
        }
        try {
          console.log(agregable)
          await usuariosService.agregarAlCarrito(agregable)
          toast({
            title: 'agregado al carrito',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        } catch (e) {
          debugger
          console.log(e.errors)
          errores.push(`Error de servidor: ${e}`)
        }
      }
      if (errores.length){
        toast({
          title: 'Ocurrió un error.',
          description: "* ".concat(errores.join("\n* ")),
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    }
  }


    // useEffect( () => { buscarProductos() }, [] )
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
          onKeyUp={e => {if (e.key == 'Enter') buscarProductos()}}
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
      <HStack minW="90vw" alignItems="stretch">
        <Box w="22%" p={3}>
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
        {console.log(itemsReal.length)}
        <SimpleGrid columns={itemsReal.length ? 4 : 1} w="76%" maxH="100%" overflowY="auto" p={3}>
          {(itemsReal.length) ? itemsReal.map((i, id) => (
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
                    {[...Array(i.puntajeDto)].map((e, n) => <AiFillStar id={`star-${id}-${n}`} />)}
                    {[...Array(5 - i.puntajeDto)].map((e, n) => <AiOutlineStar id={`empty-star-${id}-${n}`} />)}
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
                <Button alignSelf="center" colorScheme="purple" onClick={async () => await agregarAlCarrito(i.idDto, i.lotesDto)}>
                  Agregar al carrito
                </Button>
              </VStack>
            </Box>
          )) : (
            <Center
              minH="60vh"
              w="80%"
              size="full"
              m={5}
              borderRadius="2vh"
              bg="green.400"
            >
              <VStack>
                <MdOutlineReportGmailerrorred fontSize={128}/>
                <Text fontStyle="italic" fontSize="xx-large">¡No se encontraron resultados!</Text>
              </VStack>
            </Center>
          )}
        </SimpleGrid>
      </HStack>
    </VStack>
  );
}
