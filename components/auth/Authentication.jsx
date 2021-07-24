import { Auth, Typography, Button } from "@supabase/ui";
import { supabase } from "../../utils/supabaseClient";
import { Container, Heading } from "@chakra-ui/react";

export default function Authentication() {
  return (
    <Container centerContent>
      <Heading as="h1">Trim</Heading>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Auth
          supabaseClient={supabase}
          providers={["google", "facebook", "github"]}
        />
      </Auth.UserContextProvider>
    </Container>
  );
}
