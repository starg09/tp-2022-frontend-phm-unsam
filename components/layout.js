import Navbar from './navbar'
import Footer from './footer'
import ComprasRealizadasr from './comprasRealizadas'
import Perfil from './perfil'
import PerfilDeUsuario from '../pages/perfilDeUsuario'
import Carrito from './carrito'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Carrito />
      {/*<PerfilDeUsuario />*/}
      {/*<main>{children}</main>*/}
      <Footer />
    </>
  )
}