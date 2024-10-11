"use client";

import { ElementRef, useEffect, useRef } from "react";

export default function Home() {
  const videoRef = useRef<ElementRef<"video">>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
      video.controls = false;
    }
  }, []);

  return <img className="w-full h-screen" src="/splash.gif"></img>;
}
