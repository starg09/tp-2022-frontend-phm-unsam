import axios from "axios";
import getConfig from "next/config";
import Router from "next/router";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const authService = {
  isAuthenticated() {
    return (
      typeof window !== "undefined" && !(localStorage.getItem("user") === null)
    );
  },
  getUserName() {

    const user = (typeof window !== "undefined") ? localStorage.getItem("user") : null;
    return user ? JSON.parse(user).userName : null;
  },
  getNombreApellido() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user).nombreApellido : null;
  },
  getIdUsuario() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user).id : null;
  },
  getAvatar() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user).urlAvatar : null;
  },
  async signin(email, contraseña, cb) {
    await axios
      .post(`${baseUrl}/login`, {
        email: email,
        password: contraseña,
      })
      .then(function (res) {
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(res.data));
          cb();
        }
      });
  },
  async signout(cb) {
    if (typeof window !== "undefined") {
      await localStorage.removeItem("user");
      Router.push("/");
    }
  },
};

// export const fakeAuth = {
//   isAuthenticated() {
//     return !(localStorage.getItem('user') === null)
//   },
//   getUserName() {
//     const user = localStorage.getItem('user')
//     return user ? JSON.parse(user).userName : null
//   },
//   getNombreApellido() {
//     const user = localStorage.getItem('user')
//     return user ? JSON.parse(user).nombreApellido : null
//   },
//   async signin(usuario, contraseña, cb) {
//     console.log(`Ignorando contraseña, pero tiene que usarse en algo asi que la imprimo: ${contraseña}`)
//     localStorage.setItem('user', `{"nombreApellido":"Roberto Gómez","userName":"${usuario}","email":"rgomez@uqbar.unsam.edu.ar","id":1,"fechaNacimiento":"1981-06-22","frecuenciaCardiacaReposo":72,"porcentajeIntensEntr":60,"gruposMusculares":["BRAZOS","GLUTEOS","ESPALDA"],"diasMinutos":[{"dia":"LUNES","minutos":60},{"dia":"SABADO","minutos":30},{"dia":"DOMINGO","minutos":60},{"dia":"JUEVES","minutos":20}],"amigos":[6,3,5,7,4]}`)
//     setTimeout(cb, 100)
//   },
//   signout(cb) {
//     localStorage.removeItem('user')
//     setTimeout(cb, 100)
//   }
// }
