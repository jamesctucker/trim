import React, { useEffect, useState } from "react";
import Nav from "./nav/Nav";
import Sidebar from "./nav/Sidebar";
import { Grid, GridItem, Flex } from "@chakra-ui/react";
import Authentication from "./auth/Authentication";
import { supabase } from "../utils/supabaseClient";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [session, setSession] = useState<object | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <>
      {session && (
        <Grid
          templateRows=".10fr repeat(2, 1fr)"
          templateColumns=".5fr repeat(2, 1fr)"
          gap={0}
          minHeight="100vh"
        >
          <GridItem
            rowSpan={4}
            colSpan={1}
            bg="white"
            borderRight="1px"
            borderColor="gray.200"
            p={2}
          >
            <Sidebar />
          </GridItem>
          <GridItem
            rowSpan={1}
            colSpan={2}
            bg="white"
            borderBottom="1px"
            borderColor="gray.200"
          >
            <Nav />
          </GridItem>
          <GridItem rowSpan={3} colSpan={2} bg="white" p={6}>
            <main>{children}</main>
          </GridItem>
        </Grid>
      )}
      {!session && (
        <Flex minHeight="100vh" alignItems="center">
          <Authentication />
        </Flex>
      )}
    </>
  );
}
