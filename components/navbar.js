import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

class ItemNavbar {
  label = "";
  link = "";
  constructor(label, link) { this.label = label; this.link = link}
}

const NavLink = ({ children, to = "/", ...rest }) => (
  <Link href={to}>
    <Text
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      {...rest}
    >
      {children}
    </Text>
  </Link>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    setLinks([
      new ItemNavbar("Home", "/"),
      new ItemNavbar("Mi Carrito [0]", "/carrito"),
      new ItemNavbar("Iniciar Sesión", "/login"),
    ]);
    console.log(links)
  }, []);

  return (
    <Box bg="green.700" color="gray.200" px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Heading>Difficult</Heading>
        <HStack spacing={8} alignItems={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {links.map((item, id) => (
              <NavLink key={id} to={item.link}>
                {console.log(item.label)}
                {item.label}
              </NavLink>
            ))}
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
}
