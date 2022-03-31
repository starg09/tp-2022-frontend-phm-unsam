import { Box, Container, Stack, Text } from "@chakra-ui/react";
import { BsShop } from "react-icons/bs";

export default function Footer() {
  return (
    <Box
      bg="green.700"
      color="gray.200"
      w='100vw'
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction="row"
        spacing={4}
        justify="center"
        align="center"
      >
        <BsShop/>
        <Text>Difficult / 2022</Text>
      </Container>
    </Box>
  );
}
