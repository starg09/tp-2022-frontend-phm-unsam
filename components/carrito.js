import { Box, Heading, Flex, Spacer, Button } from "@chakra-ui/react";
import { BsFillTrashFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { usuariosService } from "../services/usuario.service";
import { useRouter } from "next/router";
import { carritoService } from "../services/carrito.service"

export default function Carrito(props) {
  const [carro, set_carro] = useState([]);
  const router = useRouter();
  /* const datos = {
        foto: "keen.png",
        nombre: "José Antonio",
        apellido: "Gomez",
        edad: "34",
        saldo: "$10000"
    } */
  /*  const datos = usuariosService.getUsuario(props.userId) */
  async function arrancar() {
    const llamado = await usuariosService.getCarrito(props.userId);
    console.log(llamado);
    set_carro(llamado);
  }

  async function eliminar(item) {
    let confirmacion = confirm(`Esta seguro de eliminar el item: "${item.nombre}" (Lote  #${item.lote}) x${item.cantidad}?`);
    if (confirmacion == true) {
      await usuariosService.quitarDelCarrito(item.id, item.lote, props.userId);
      arrancar();
    }
  }

  async function vaciar() {
    let confirmacion = confirm("Esta seguro de eliminar el carrito?");
    if (confirmacion == true) {
      await usuariosService.vaciarCarrito(props.userId);
      arrancar();
    }
  }

  async function comprar() {
    let confirmacion = confirm("Esta seguro de raelizar la compra?");
    if (confirmacion == true) {
      await carritoService.comprar(props.userId);
      router.push('/')
      arrancar();
    }
  }

  useEffect(() => {
    arrancar();
  }, []);
  /* const carro = [
        {
            producto: "Acme Rustico",
            descripcion: "Porcelanato rustico marca Acme",
            lote: "2222",
            cantidad: "2",
            precio: "$5073.10"
        },
        {
            producto: "Acme Arena",
            descripcion: "Porcelanato arena marca Acme",
            lote: "5435",
            cantidad: "3",
            precio: "$5962.11"
        }] */

  return (
    <Box w="95%" mx="auto" my="2em">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Producto</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Lote</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>
        <tbody>
          {carro?.map((c) => (
            <tr key={c.id}>
              <th scope="row">{c.nombre}</th>
              <td>{c.descripcion}</td>
              <td>{c.lote}</td>
              <td>{c.cantidad}</td>
              <td>${c.precio}</td>
              <td>
                <button>
                  <BsFillTrashFill onClick={() => eliminar(c)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Flex>
        <Spacer />
        <Box p="4">
          <Button colorScheme="teal" onClick={() => vaciar()}>
            Limpiar el carrito
          </Button>
        </Box>
        <Box p="4">
          <Button colorScheme="teal" onClick={() => comprar()}>Comprar</Button>
        </Box>
      </Flex>
    </Box>
  );
}
