"use client";

import { useUser } from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { useUtils } from "@telegram-apps/sdk-react";
import { Button, Cell, List, Title } from "@telegram-apps/telegram-ui";
import { BOT_USERNAME, SHARE_MESSAGE } from "../constants";
import { formatNumber } from "@/utils/format-number";

const arr = new Array(15).fill(0).map((_, i) => i);

export default function Page() {
  const utils = useUtils();
  const { user } = useUser();

  function referFriend() {
    const encodedUrl = encodeURIComponent(
      `https://t.me/shahzar_2024_bot/${BOT_USERNAME}?startapp=${user?.Id || ""}`
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
    <div>
      <h1 className="p-5 sticky top-0 z-50 backdrop-blur-lg font-bold text-xl">
        Friends
        <div style={{ float: "right" }}>
          <Button size="s" onClick={() => referFriend()} className="mr-10">
            Refer A Friend
          </Button>
          <Button
            size="s"
            onClick={() =>
              navigator.clipboard.writeText(
                `https://t.me/shahzar_2024_bot/${BOT_USERNAME}?startapp=${
                  user?.Id || ""
                }`
              )
            }
          >
            Copy Invite
          </Button>
        </div>
      </h1>

      <List>
        {(friendsQuery.data || []).map((item) => (
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
            {item.Friend.firstName} {item.Friend.lastName}
          </Cell>
        ))}

        {/* <div className="py-4 px-6 flex justify-between">
          <h3>Fname LName</h3>

          <div>Task Streaks: 1</div>
        </div> */}
      </List>
    </div>
  );
}
