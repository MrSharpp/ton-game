import { ElementRef, useEffect, useRef } from "react";

export function SplashScreen({ path }: { path: string }) {
  const videoRef = useRef<ElementRef<"video">>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.muted = true;

      try {
        video.play();
      } catch (error) {
        console.warn("Autoplay failed:", error);
      }

      try {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video?.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.mozRequestFullScreen) {
          video.mozRequestFullScreen();
        }
      } catch (error) {
        // If fullscreen permission is denied, then do nothing
        console.log("DENIED Fullscreen permission");
      }
    }
  }, []);

  return (
    <img
      className="w-full h-screen splash"
      src="/splash.gif"
      height={"100%"}
    ></img>
  );
}
