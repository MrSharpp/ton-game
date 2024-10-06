"use client";

import { useUser } from "@/hooks/useUser";
import { initData } from "@telegram-apps/sdk";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { LargeTitle } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";

export default function Home() {
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
      <LargeTitle
        weight="1"
        style={{ marginBottom: "50px", color: "white" }}
        color="white"
      >
        AiBulls.io
      </LargeTitle>
    </div>
  );
}
