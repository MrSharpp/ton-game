"use client";

import { useUtils } from "@telegram-apps/sdk-react";
import {
  Avatar,
  Cell,
  List,
  Navigation,
  Section,
  Title,
} from "@telegram-apps/telegram-ui";
import React from "react";

type Props = {};

const arr = new Array(15).fill(0).map((_, i) => i);

export default function Page({}: Props) {
  const utils = useUtils();

  function copyToClipBoard() {
    utils.openLink("https://t.me/share/url?url=https://t.me/shahzar_2024_bot");
  }

  return (
    <div>
      <Title
        level="3"
        weight="1"
        className="p-5 sticky top-0 z-50 backdrop-blur-xl "
      >
        Friends
      </Title>

      <List>
        {arr.map((a) => (
          <Cell key={a} before={<Avatar />} after={<Navigation />}>
            Friend {a}
          </Cell>
        ))}
      </List>
    </div>
  );
}
