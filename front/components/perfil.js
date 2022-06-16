import {
  Grid,
  GridItem,
  Box,
  Avatar,
  Center,
  AspectRatio,
  Input,
  InputRightElement,
  InputGroup,
  Link,
} from "@chakra-ui/react";
import { usuariosService } from "../services/usuario.service";
import { useEffect, useState } from "react";
import { FaRegEdit, FaRegCalendarAlt, FaRegMoneyBillAlt } from "react-icons/fa";

export default function Perfil(props) {
  const [datos, set_datos] = useState({});
  const [edad, set_edad] = useState(0);
  /* const datos = {
        foto: "keen.png",
        nombre: "José Antonio",
        apellido: "Gomez",
        edad: "34",
        saldo: "$10000"
    } */
  /*  const datos = usuariosService.getUsuario(props.userId) */
  async function arrancar() {
    console.log(props.userId);
    const llamado = await usuariosService.getUsuario(props.userId);
    console.log(llamado);
    set_datos(llamado);
    set_edad(new Date().getFullYear() - llamado.fechaNacimiento.slice(0, 4));
  }

  useEffect(
    () => {
      arrancar();
    },
    { datos }
  );

  return (
    <Grid
      m="2em"
      p="1em"
      w="80%"
      h="60%"
      bg="papayawhip"
      templateRows="repeat(2, 1fr)"
      templateColumns="1.8fr repeat(4, 1fr)"
      gap={4}
      boxShadow="lg"
    >
      <GridItem rowSpan={2} colSpan={1} m="2">
        <Center w="100%" h="100%">
          <AspectRatio ratio={1} p="0.2em" w="100%" h="100%">
            <Center>
              <Avatar
                size="2xl"
                w="90%"
                h="90%"
                borderRadius="10%"
                src="keen.png"
                name={`${datos.nombre} ${datos.apellido}`}
              />
            </Center>
          </AspectRatio>
        </Center>
      </GridItem>
      <GridItem px={6} colSpan={2} alignSelf="center">
        <Box>Nombre</Box>
        <InputGroup m="2">
          <Input
            isReadOnly
            bg="white"
            border="1px"
            borderColor="tomato"
            focusBorderColor="tomato"
            value={datos.nombre}
          />
          <InputRightElement width="3rem">
            <Link _hover={{color:"black"}} color="grey">
              <FaRegEdit fontSize={24} onClick={() => {}}/>
            </Link>
          </InputRightElement>
        </InputGroup>
      </GridItem>
      <GridItem px={6} colSpan={2} alignSelf="center">
        <Box>Apellido</Box>
        <InputGroup m="2">
          <Input
            isReadOnly
            bg="white"
            border="1px"
            borderColor="tomato"
            focusBorderColor="tomato"
            value={datos.apellido}
          />
          <InputRightElement width="3rem">
            <Link _hover={{color:"black"}} color="grey">
              <FaRegEdit fontSize={24} onClick={() => {}}/>
            </Link>
          </InputRightElement>
        </InputGroup>
      </GridItem>
      <GridItem px={6} colSpan={2} alignSelf="center">
        <Box>Edad</Box>
        <InputGroup m="2">
          <Input
            isReadOnly
            bg="white"
            border="1px"
            borderColor="tomato"
            focusBorderColor="tomato"
            value={edad}
          />
          <InputRightElement width="3rem">
            <Link _hover={{color:"cyan.800"}} color="grey">
              <FaRegCalendarAlt fontSize={24} onClick={() => {}}/>
            </Link>
          </InputRightElement>
        </InputGroup>
      </GridItem>
      <GridItem px={6} colSpan={2} alignSelf="center">
        <Box>Saldo</Box>
        <InputGroup m="2">
          <Input
            isReadOnly
            bg="white"
            border="1px"
            borderColor="tomato"
            focusBorderColor="tomato"
            value={`$${datos.saldo?.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          />
          <InputRightElement width="3rem">
            <Link _hover={{color:"green"}} color="grey">
              <FaRegMoneyBillAlt fontSize={24} onClick={() => {}}/>
            </Link>
          </InputRightElement>
        </InputGroup>
      </GridItem>
    </Grid>
  );
}
