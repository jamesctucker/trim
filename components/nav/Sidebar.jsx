import NextLink from "next/link";
import { Flex, Text, Link, Container, Heading } from "@chakra-ui/react";
import { Inbox as InboxIcon, Star as StarIcon } from "react-feather";

function Sidebar() {
  return (
    <>
      <Heading as="h1">Trim</Heading>
      <Flex direction="column" pt={6}>
        <Container mb={3}>
          <Link as={NextLink} href="/inbox">
            <Flex>
              <InboxIcon />
              <Text ml={2}>Inbox</Text>
            </Flex>
          </Link>
        </Container>
        <Container mb={3}>
          <Link as={NextLink} href="/">
            <Flex>
              <StarIcon />
              <Text ml={2}>Today</Text>
            </Flex>
          </Link>
        </Container>
      </Flex>
    </>
  );
}

export default Sidebar;
