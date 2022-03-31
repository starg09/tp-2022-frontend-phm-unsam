import "../styles/globals.css";
import Layout from "../components/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
