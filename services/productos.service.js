import axios from "axios";
import getConfig from "next/config";
import Router from "next/router";
/* const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); */


const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`; //HTTPS NO FUNCIONA, USAR HTTP

class ProductosService {
    async getProductos () {
        const productos = await axios.get(`${baseUrl}/productos`)
        return productos.data
    }

    async obtenerPaisesOrigen() {
        const paises = await axios.get(`${baseUrl}/productos/paisesOrigen`)
        return paises.data
    }

    async filtrarProductos(nombre, paises, puntajeMinimo) {
        const productos = await axios.get(`${baseUrl}/productos/filtrar?nombre=${nombre}&paises=${paises.join(",")}&puntajeMinimo=${puntajeMinimo}`)
        return productos.data
    }

    async productoDetalles (id) {
        const producto = await axios.get(`${baseUrl}/productos/${id}/detalles`)
        return producto.data
    }
}

export const productosService = new ProductosService()