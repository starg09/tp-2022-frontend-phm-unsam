/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret:
      "secretoNoTanSecretoHabriaQueOcultarlo",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080/" // development api
        : "https://localhost:8080/", // production api
  },
};

module.exports = nextConfig;
