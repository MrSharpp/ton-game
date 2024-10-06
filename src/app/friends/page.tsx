"use client";

import { useUser } from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { useLaunchParams, useUtils } from "@telegram-apps/sdk-react";
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
import { BOT_USERNAME, SHARE_MESSAGE } from "../constants";

type Props = {};

const arr = new Array(15).fill(0).map((_, i) => i);

export default function Page({}: Props) {
  const utils = useUtils();
  const user = useUser();

  function referFriend() {
    utils.shareURL(`https://t.me/${BOT_USERNAME}?startapp=${user?.Id}}`);
  }

  const friendsQuery = useQuery({
    queryKey: ["friends", user],
    queryFn: () =>
      fetch(`/api/friends/${user?.Id}`).then(async (res) =>
        JSON.parse(await res.text())
      ),
    placeholderData: [],
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
        {friendsQuery.data.map((item) => (
          <Cell
            key={item.Id}
            after={<div>Task Streaks: {item.Friend.taskStreaks}</div>}
          >
            {item.Friend.firstName} {item.Friend.lastName}
          </Cell>
        ))}
      </List>
    </div>
  );
}
