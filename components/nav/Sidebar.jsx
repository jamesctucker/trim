import Link from "next/link";

function Sidebar() {
  return (
    <div>
      <Link href="/inbox">
        <a>Inbox</a>
      </Link>
      <Link href="/">
        <a>Today</a>
      </Link>
    </div>
  );
}

export default Sidebar;
