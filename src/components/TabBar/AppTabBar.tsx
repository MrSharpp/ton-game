"use client";

import { Tabbar } from "@telegram-apps/telegram-ui";
import React from "react";
import {
  IconHome,
  IconUsersGroup,
  IconChecklist,
  IconGift,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const tabItems = [
  {
    text: "Home",
    icon: <IconHome />,
    to: "/",
  },
  {
    text: "Friends",
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

  return (
    <Tabbar>
      {tabItems.map(({ text, icon, to }) => (
        <Tabbar.Item key={text} text={text} onClick={() => router.push(to)}>
          {icon}
        </Tabbar.Item>
      ))}
    </Tabbar>
  );
}

export default AppTabBar;
