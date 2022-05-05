import axios from "axios";
import getConfig from "next/config";
import Router from "next/router";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`

class CarritoService {
    async comprar (id) {
        const carrito = await axios.put(`${baseUrl}/usuarios/${id}/comprar`)
    }
}

export const carritoService = new CarritoService()