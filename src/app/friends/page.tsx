"use client";

import { useUser } from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { useUtils } from "@telegram-apps/sdk-react";
import {
  Button,
  Cell,
  LargeTitle,
  List,
  Subheadline,
  Title,
} from "@telegram-apps/telegram-ui";
import { BOT_USERNAME, SHARE_MESSAGE } from "../constants";
import { formatNumber } from "@/utils/format-number";
import { IconCopy } from "@tabler/icons-react";

const arr = new Array(15).fill(0).map((_, i) => i);

export default function Page() {
  const utils = useUtils();
  const { user } = useUser();

  function referFriend() {
    const encodedUrl = encodeURIComponent(
      `https://t.me/${BOT_USERNAME}?startapp=${user?.Id || ""}`
      // `https://t.me/owoelawnbot/mybot?startapp=${user?.Id || ""}`
    );
    utils.openTelegramLink(
      `https://t.me/share/url?url=${encodedUrl.toString()}&text=${SHARE_MESSAGE}`
    );
  }

  const friendsQuery = useQuery({
    queryKey: ["friends", user],
    queryFn: () =>
      fetch(`/api/friends/${user?.Id}`).then(async (res) => await res.json()),
    placeholderData: [],
    enabled: !!user?.Id,
  });

  return (
    <div style={{ overflow: "auto" }}>
      <div className="flex align-center">
        <h1 className="p-5 sticky top-0 z-50 backdrop-blur-lg font-bold text-xl">
          Frens
        </h1>
        <div className="ml-auto mr-2 flex " style={{ alignItems: "center" }}>
          <Button size="s" onClick={() => referFriend()} className="mr-2">
            Refer A Fren
          </Button>
          <Button
            size="s"
            onClick={() =>
              navigator.clipboard.writeText(
                `${decodeURI(
                  SHARE_MESSAGE
                )}\nhttps://t.me/${BOT_USERNAME}?startapp=${user?.Id || ""}`
              )
            }
          >
            <IconCopy stroke={2} />
          </Button>
        </div>
      </div>

      <LargeTitle className="text-center mx-10">
        Invite a fren to get 1000 streak points!
      </LargeTitle>
      <img
        src="banner.png"
        height={150}
        width={150}
        className="mr-auto ml-auto"
      />

      <List>
        {(friendsQuery.data || []).map((item, index) => (
          <Cell
            key={item.Id}
            after={
              <div>
                {formatNumber(
                  (item.Friend.taskStreaks || 0) +
                    (item.Friend.friendStreaks || 0)
                )}
              </div>
            }
            style={{
              borderBottom: "solid",
              borderTop: "hidden",
              borderRight: "hidden",
              borderLeft: "hidden",
              borderWidth: "thin",
            }}
          >
            <span className="mr-2">{index + 1}</span> {item.Friend.firstName}{" "}
            {item.Friend.lastName}
          </Cell>
        ))}
      </List>
    </div>
  );
}
