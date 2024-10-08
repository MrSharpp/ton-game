"use client";

import { useUtils } from "@telegram-apps/sdk-react";
import { Caption, Subheadline } from "@telegram-apps/telegram-ui";

export default function Home() {
  return (
    <video
      loop
      playsInline
      muted
      autoPlay
      className="h-full w-full h-inherit object-cover"
    >
      <source src={"/splash.mp4"} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
