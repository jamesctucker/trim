import Nav from "../components/nav/Nav";
import "../styles/globals.css";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import Sidebar from "../components/nav/Sidebar";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Nav />
      <Sidebar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
