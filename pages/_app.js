import "../styles/globals.css";
import Layout from "../components/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChakraProvider } from "@chakra-ui/react";
import RouteGuard from "../components/RouteGuard"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ChakraProvider>
      <RouteGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </ChakraProvider>
  );
}

export default MyApp;
