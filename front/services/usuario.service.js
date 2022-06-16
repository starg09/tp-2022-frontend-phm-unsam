import axios from "axios";
import getConfig from "next/config";
import Router from "next/router";
/* const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); */


const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`; //HTTPS NO FUNCIONA, USAR HTTP

class UsuariosService {
    async getUsuario (id) {
        const usuario = await axios.get(`${baseUrl}/usuarios/${id}`)
        return usuario.data
    }
    async comprasUsuario (id) {
        const compras = await axios.get(`${baseUrl}/usuarios/${id}/compras`)
        return compras.data
    }
    async getCarrito (id) {
        const carrito = await axios.get(`${baseUrl}/usuarios/carrito/${id}`)
        return carrito.data
    }
    async vaciarCarrito (id) {
        await axios.delete(`${baseUrl}/usuarios/${id}/carrito/vaciar`)
    }
    async quitarDelCarrito(idProd, idLote, idUser){
        await axios.delete(`${baseUrl}/usuarios/carrito/eliminar`, {data: {idUsuario:idUser, idProducto:idProd, loteNumero: idLote}})
    }
    async agregarAlCarrito(agregableDto, idUser){
        await axios.put(`${baseUrl}/usuarios/${idUser}/carrito/agregar`, agregableDto)
    }
    async enviarClick(clickData) {
        await axios.post(`${baseUrl}/usuarios/agregarClick`, clickData)

    }
}

export const usuariosService = new UsuariosService()