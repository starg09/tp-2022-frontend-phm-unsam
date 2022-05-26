import Navbar from './navbar'
import Footer from './footer'
import { Flex, Spacer } from '@chakra-ui/react'
import { useRouter } from 'next/router'


export default function Layout({ children }) {
  const router = useRouter()
  const showNavBar = !(router.pathname === '/login');
  return (
    <Flex
    direction='column'
    minH='100vh'>
      {showNavBar && <Navbar />}
      <main>{children}</main>
      <Spacer/>
      <Footer />
    </Flex>
  )
}