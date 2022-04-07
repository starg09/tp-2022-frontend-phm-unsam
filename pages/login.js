import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  SlideFade,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { authService } from "../services";

export default function LoginPage() {
  const [redirectToReferrer, setRedirectToReferrer] = useState(
    authService.isAuthenticated()
  );
  const [loginErrors, setLoginErrors] = useState([])
  const [loginEnProceso, setLoginEnProceso] = useState(false)
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginEnProceso(true);
    const errores = [];
    //console.log(`User: ${user} & Password: ${password}`)
    if (event.target.email.value === "") {
      errores.push("No se puede dejar el nombre de usuario en blanco.");
    }
    if (event.target.password.value === "") {
      errores.push("La contraseña no puede estar en blanco.");
    }
    if (errores.length > 0) {
      setLoginErrors(errores);
      setLoginEnProceso(false);
      return;
    }
    try {
      await authService.signin(event.target.email.value, event.target.password.value, () => {
        setRedirectToReferrer(true);
      });
    } catch (err) {
      console.log(err.response);
      setLoginErrors([
        err.response
          ? `Error ${err.response?.status}: "${err.response?.data.error}"`
          : "No se ha podido conectar con el servidor.",
      ]);
    }
    setLoginEnProceso(false);
  };

  if (redirectToReferrer === true) {
    router.push('/');
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Iniciar Sesión</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id="email">
                <FormLabel>Correo Electrónico</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Contraseña</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                {/* <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack> */}
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      {loginErrors.length > 0 &&
      <Box>
        <SlideFade initialScale={0.9} in={loginErrors.length > 0}>
          <Alert status="error" textAlign="start" minW="100%">
            <AlertIcon boxSize={12} />
            <Box flex="1" pl={2}>
              <AlertTitle pb={1}>Error al Autenticar</AlertTitle>
              <ul>{loginErrors.map((err,i) =>
                <AlertDescription key={"alert-error-" + i} display="block" fontSize="md" pl={4}>
                  <li>{err}</li>
                </AlertDescription>
              )}</ul>
            </Box>
          </Alert>
        </SlideFade>
      </Box>
      }
      </Stack>
    </Flex>
  );
}
