import Nav from "./nav/Nav";
import Sidebar from "./nav/Sidebar";
import Footer from "./footer/Footer";
import { Grid, GridItem } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <>
      <Grid
        templateRows=".25fr repeat(3, 1fr)"
        templateColumns=".5fr repeat(2, 1fr)"
        gap={0}
      >
        <GridItem rowSpan={4} colSpan={1} bg="white">
          <Sidebar />
        </GridItem>
        <GridItem rowSpan={1} colSpan={2} bg="white">
          <Nav />
        </GridItem>
        <GridItem rowSpan={3} colSpan={2} bg="white">
          <main>{children}</main>
        </GridItem>
      </Grid>
    </>
  );
}
