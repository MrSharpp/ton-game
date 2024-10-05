"use server";

import { initData } from "@telegram-apps/sdk";
import { LargeTitle } from "@telegram-apps/telegram-ui";

export default async function Home() {
  console.log(initData.user());

  return (
    <div
      style={{
        textAlign: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <LargeTitle weight="1" style={{ marginBottom: "50px" }}>
        Home Page
      </LargeTitle>
    </div>
  );
}
