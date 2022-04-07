import Navbar from './navbar'
import Footer from './footer'
import ComprasRealizadasr from './comprasRealizadas'
import Perfil from './perfil'
import PerfilDeUsuario from '../pages/perfilDeUsuario'
import Carrito from './carrito'
import { Flex, Spacer } from '@chakra-ui/react'
import TablaProducto from './tablaProducto'
import Producto from './producto'


export default function Layout({ children }) {
  return (
    <Flex
    direction='column'
    minH='100vh'>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Flex>
  )
}