import { ReactNode, useEffect, useRef, useState } from "react";
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
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Carrito from "./carrito";
import { authService } from "../services";

class ItemNavbar {
  label = "";
  link = null;
  action = null;

  constructor(label, link, action) {
    this.label = label;
    this.link = link;
    this.action = action;
  }

  static NewWithLink(label, link) {
    return new ItemNavbar(label, link, null);
  }
  static NewWithAction(label, action) {
    return new ItemNavbar(label, null, action);
  }
}

const NavLink = ({ children, item, ...rest }) => (
  <Link href={item.link ? item.link : null}>
    <Text
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      onClick={item.action ? item.action : null}
      {...rest}
    >
      {item.label}
    </Text>
  </Link>
);

export default function NavBar() {
  const {
    isOpen: isMenuOpen,
    onOpen: onMenuOpen,
    onClose: onMenuClose,
  } = useDisclosure();
  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();
  const [links, setLinks] = useState([]);
  const firstField = useRef()

  const [tamanioCarrito, setTamanioCarrito] = useState(0)

  const linksNavbar = []
  linksNavbar.push(ItemNavbar.NewWithLink("Home", "/"))
  if (authService.isAuthenticated()) {
    //TODO Menu de chakra
    linksNavbar.push(ItemNavbar.NewWithAction(`Mi Carrito [${tamanioCarrito}]`, onCartOpen))
    linksNavbar.push(ItemNavbar.NewWithLink("Mi Perfil", "/perfilDeUsuario"))
    linksNavbar.push(ItemNavbar.NewWithAction("Logout >", authService.signout))
  } else {
    linksNavbar.push(ItemNavbar.NewWithLink("Iniciar Sesión", "/login"))
  }


  useEffect(() => {
    setLinks(linksNavbar);
    console.log(links);
  }, []);

  return (
    <>
      <Box bg="green.700" color="gray.200" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isMenuOpen ? onMenuClose : onMenuOpen}
          />
          <Heading>Difficult</Heading>
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {links.map((item, id) => (
                <NavLink key={id} item={item} />
              ))}
              {/* <NavLink to="/">Home</NavLink>
            <NavLink to="">Mi Carrito [0]</NavLink>
            <NavLink to="/login">Iniciar Sesión</NavLink> */}
            </HStack>
          </HStack>
        </Flex>
      </Box>
      <Drawer
        isOpen={isCartOpen}
        placement="right"
        size="md"
        initialFocusRef={firstField}
        onClose={onCartClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Carrito De Compras</DrawerHeader>
          <DrawerBody>
            <Carrito userId={1} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
