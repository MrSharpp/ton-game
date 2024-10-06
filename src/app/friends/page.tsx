"use client";

import { useUser } from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { useUtils } from "@telegram-apps/sdk-react";
import {
  Avatar,
  Button,
  Cell,
  List,
  Navigation,
  Section,
  Title,
} from "@telegram-apps/telegram-ui";
import React from "react";
import { BOT_USERNAME } from "../constants";

type Props = {};

const arr = new Array(15).fill(0).map((_, i) => i);

export default function Page({}: Props) {
  const utils = useUtils();
  const user = useUser();

  function referFriend() {
    utils.openTelegramLink(`https://t.me/share/url?url=https://t.me/${BOT_USERNAME}&text=%0A•A Distinguished Committed Airdrop in the history of TG mini apps💰
%0A•Boost your allocation with time streak tasks & frens streak Tasks.💸
%0A•Take a Stride and Join us to uplift your crypto Journey.`);
  }

  const friendsQuery = useQuery({
    queryKey: ["friends", user],
    queryFn: () =>
      fetch(`/api/friends/${user?.Id}`).then(async (res) =>
        JSON.parse(await res.text())
      ),
  });

  console.log(friendsQuery.data);

  return (
    <div>
      <Title
        level="3"
        weight="1"
        className="p-5 sticky top-0 z-50 backdrop-blur-xl "
      >
        Friends
        <Button
          style={{ float: "right" }}
          size="s"
          onClick={() => referFriend()}
        >
          Refer A Friend
        </Button>
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
