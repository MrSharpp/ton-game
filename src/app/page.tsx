"use client";

import { useUtils } from "@telegram-apps/sdk-react";
import { Caption, Subheadline } from "@telegram-apps/telegram-ui";

export default function Home() {
  const util = useUtils();

  return (
    <div
      style={{
        textAlign: "center",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: "url('/bg.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        position: "relative",
      }}
    >
      <img src="/banner.png" alt="TON Connect" width={300} height={300} />

      <Subheadline level="1" weight="3">
        Time streak Task: 0
      </Subheadline>

      <Subheadline level="1" weight="3">
        Fren streak Task: 0
      </Subheadline>

      <div className="mt-10">
        <Subheadline level="1" weight="3">
          Social Tasks
        </Subheadline>

        <div className="flex flex-col">
          <Caption
            level="1"
            weight="3"
            onClick={() => util.openLink("https://www.instagram.com")}
          >
            Instagram
          </Caption>
          <Caption
            level="1"
            weight="3"
            onClick={() => util.openLink("https://www.x.com")}
          >
            Twitter
          </Caption>
          <Caption
            level="1"
            weight="3"
            onClick={() => util.openLink("https://www.telegram.com")}
          >
            Telegram
          </Caption>
        </div>
      </div>
    </div>
  );
}
