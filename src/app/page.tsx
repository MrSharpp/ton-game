"use client";

import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useUtils } from "@telegram-apps/sdk-react";

export default function Home() {
  const wallet = useTonWallet();
  const utils = useUtils();
  const [tonConnectUI, setOptions] = useTonConnectUI();

  function sendToOwnerAddress() {
    console.log("TDA");

    tonConnectUI.sendTransaction({
      messages: [
        {
          address: "0QCEUg8zL-iW1cQW36NZ6ngw9NXDI9AWjX5Bsebvy2-kcsNL", // destination address
          amount: "1000000000", //Toncoin in nanotons
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 60,
    });
  }

  function copyToClipBoard() {
    utils.shareURL("https://t.me/shahzar_2024_bot");
  }

  function disconnectWallet() {
    tonConnectUI.disconnect();
  }

  return (
    <div
      style={{
        backgroundColor: "black",
        textAlign: "center",
        paddingTop: "50%",
        height: "100%",
      }}
    >
      <h1 style={{ marginBottom: "50px" }}>Amir Mini App</h1>
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          gap: "50px",
          flexBasis: "auto",
        }}
      >
        {!wallet ? (
          <TonConnectButton className="ton-connect-page__button" />
        ) : (
          <Button onClick={() => disconnectWallet()} className="btn">
            Disconnect Wallet
          </Button>
        )}
        {!!wallet && (
          <Button onClick={() => sendToOwnerAddress()} className="btn">
            Make A Small Transaction (1 Ton)
          </Button>
        )}
        <Button onClick={() => copyToClipBoard()} className="btn">
          Refferals
        </Button>
      </div>
    </div>
  );
}
