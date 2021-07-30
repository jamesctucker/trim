import { useEffect, useState } from "react";
import { Button } from "@supabase/ui";
import {
  Avatar,
  Flex,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuDivider,
  Text,
} from "@chakra-ui/react";
import { supabase } from "../../utils/supabaseClient";

export default function Nav() {
  const user = supabase.auth.user();
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const signOut = () => {
    supabase.auth.signOut();
  };
  return (
    <div>
      {session && (
        <nav>
          <Flex justify="flex-end" p={2}>
            <Menu placement="bottom">
              <MenuButton>
                <Avatar bg="teal.500" />
              </MenuButton>
              <MenuList p={4}>
                <Text fontSize="sm" color="gray.500" isTruncated>
                  Signed in: {user.email}
                </Text>
                <MenuGroup title="Profile">
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>Settings</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Help">
                  <MenuItem>FAQ</MenuItem>
                </MenuGroup>
                <Button block onClick={signOut}>
                  Sign out
                </Button>
              </MenuList>
            </Menu>
          </Flex>
        </nav>
      )}
    </div>
  );
}
