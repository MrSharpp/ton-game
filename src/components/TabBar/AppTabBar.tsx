"use client";

import { Tabbar } from "@telegram-apps/telegram-ui";
import React, { useState } from "react";
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
  const [selectedTab, setSelectedTab] = useState("/");

  function switchTab(to: string) {
    setSelectedTab(to);
    router.push(to);
  }

  return (
    <Tabbar style={{ height: "100px" }}>
      {tabItems.map(({ text, icon, to }) => (
        <Tabbar.Item
          key={text}
          text={text}
          selected={to == selectedTab}
          onClick={() => switchTab(to)}
        >
          {icon}
        </Tabbar.Item>
      ))}
    </Tabbar>
  );
}

export default AppTabBar;
