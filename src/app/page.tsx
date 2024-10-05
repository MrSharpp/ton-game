"use client";

import { initData } from "@telegram-apps/sdk";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { LargeTitle } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const user = useLaunchParams().initData?.user;

  useEffect(() => {
    fetch(`/api/users/upsert`, {
      method: "POST",
      body: JSON.stringify(user),
    }).then(() => setLoading(false));
  }, []);

  if (loading) return "Loading...";

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
