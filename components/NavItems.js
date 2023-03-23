import React, { useState } from "react";
import { ArrowSmUpIcon } from "@heroicons/react/outline";

import Link from "next/link";

const NavItems = () => {
  const PAY = "XPayment";
  const XLENDING = "XPeerLending";
  const CONVERT = "XConvert";

  const [selectedNavItem, setSelectedNavItem] = useState(CONVERT);

  return (
    <div className="bg-zinc-900 h-fit flex items-center justify-around rounded-full mx-6">
      <Link href="/">
        <p
          className={getNavIconClassName(CONVERT)}
          onClick={() => setSelectedNavItem(CONVERT)}
        >
          {CONVERT}
        </p>
      </Link>
      <Link href="/lending">
        <p
          className={getNavIconClassName(XLENDING)}
          onClick={() => setSelectedNavItem(XLENDING)}
        >
          {XLENDING}
        </p>
      </Link>
      <Link href="/pay">
        <p
          className={getNavIconClassName(PAY)}
          onClick={() => setSelectedNavItem(PAY)}
        >
          {PAY}
        </p>
      </Link>
    </div>
  );

  function getNavIconClassName(name) {
    let className =
      "p-1 px-4 cursor-pointer border-[4px] border-transparent flex items-center";
    className +=
      name === selectedNavItem
        ? " bg-zinc-800 border-zinc-900 rounded-full"
        : "";
    return className;
  }
};

export default NavItems;
