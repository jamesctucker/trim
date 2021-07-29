import Link from "next/link";
import { Flex } from "@chakra-ui/react";

function Sidebar() {
  return (
    <Flex direction="column">
      <Link href="/inbox">
        <a>Inbox</a>
      </Link>
      <Link href="/">
        <a>Today</a>
      </Link>
    </Flex>
  );
}

export default Sidebar;
