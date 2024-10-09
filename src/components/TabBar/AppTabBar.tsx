"use client";

import { Tabbar } from "@telegram-apps/telegram-ui";
import React, { useEffect, useState } from "react";
import {
  IconHome,
  IconUsersGroup,
  IconChecklist,
  IconGift,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const tabItems = [
  {
    text: "Home",
    icon: <IconHome />,
    to: "/",
  },
  {
    text: "Frens",
    icon: <IconUsersGroup />,
    to: "/friends",
  },
  {
    text: "Tasks",
    icon: <IconChecklist />,
    to: "/tasks",
  },
  {
    text: "Airdrop",
    icon: <IconGift />,
    to: "/airdrop",
  },
];

function AppTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  function switchTab(to: string) {
    router.push(to);
  }

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.refetchQueries();
  }, [pathname]);

  return (
    <Tabbar style={{ height: "100px" }}>
      {tabItems.map(({ text, icon, to }) => (
        <Tabbar.Item
          key={text}
          text={text}
          selected={to === pathname || (pathname.startsWith(to) && to !== "/")}
          onClick={() => switchTab(to)}
        >
          {icon}
        </Tabbar.Item>
      ))}
    </Tabbar>
  );
}

export default AppTabBar;
