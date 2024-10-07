"use client";

export default function Home() {
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
    </div>
  );
}
