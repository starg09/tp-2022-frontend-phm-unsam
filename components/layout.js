import Navbar from './navbar'
import Footer from './footer'
import ComprasRealizadasr from './comprasRealizadas'
import Perfil from './perfil'
import PerfilDeUsuario from '../pages/perfilDeUsuario'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <PerfilDeUsuario />
      {/*<main>{children}</main>*/}
      <Footer />
    </>
  )
}