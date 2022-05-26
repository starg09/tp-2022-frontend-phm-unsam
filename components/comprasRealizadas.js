import { Heading, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { usuariosService } from "../services/usuario.service";

export default function ComprasRealizadas(props) {
  //traer las compras en una lista
  const [compras, set_compras] = useState([]);
  let [loaded, set_loaded] = useState(false);
  /* const compras = [
        {
            orden: "#1",
            fecha: "01/02/2022",
            cantidad: "4",
            importe: "$5073.10"
        },
        {
            orden: "#45",
            fecha: "05/02/2022",
            cantidad: "1",
            importe: "$5962.11"
        }
    ] */

  async function arrancar() {
    const llamado = await usuariosService.comprasUsuario(props.userId);
    // llamado = [...llamado]
    // llamado.forEach( (compra) => compra.fechaCompra = compra.fechaCompra.split("-").reverse().join("/"))
    set_compras([...llamado]);
  }

  useEffect(async () => {
    await arrancar();
    if (!loaded) {
      set_loaded(true);
    }
  }, []);

  /* const renderCompras = compras.map( c =>
        <tr>
        <th scope="row">{c.orden}</th>
        <td>{c.fecha}</td>
        <td>{c.cantidad}</td>
        <td>{c.importe}</td>
        </tr>
        ) */
  return (
    <div className="w-75">
      <Heading size={"lg"} pb={6}>Compras</Heading>
      <table className="table table-striped text-center">
        <thead>
          <tr className="px-2">
            <th className="col-md-3" scope="col">Orden de compra</th>
            <th className="col-md-3" scope="col">Fecha</th>
            <th scope="col">Cantidad de articulos</th>
            <th className="col-md-3" scope="col">Importe total</th>
          </tr>
        </thead>
        <tbody>{compras.map(
            (c) => (
                <tr className="px-2">
                    <th className="px-5" scope="row">#{c.ordenCompra}</th>
                    <td className="px-5">{c.fechaCompra.split("-").reverse().join("/")}</td>
                    <td className="px-5">{c.cantidad}</td>
                    <td className="px-5">
                      ${
                        c.importe
                          .toLocaleString(
                            undefined,
                            { minimumFractionDigits: 2 }
                          )
                      }
                    </td>
                </tr>
            )
    )}</tbody>
      </table>
    </div>
  );
}
