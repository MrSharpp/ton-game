"use client";

import { useUtils } from "@telegram-apps/sdk-react";
import { Button, LargeTitle } from "@telegram-apps/telegram-ui";
import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";

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
        textAlign: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <LargeTitle weight="1" style={{ marginBottom: "50px" }}>
        Amir Mini App
      </LargeTitle>

      <div
        style={{
          flexDirection: "column",
          display: "flex",
          gap: "20px",
          flexBasis: "auto",
          minWidth: 150,
        }}
      >
        {!wallet ? (
          <TonConnectButton className="ton-connect-page__button" />
        ) : (
          <Button onClick={() => disconnectWallet()} size="s">
            Disconnect Wallet
          </Button>
        )}
        {!!wallet && (
          <Button onClick={() => sendToOwnerAddress()} size="s">
            Make A Small Transaction (1 Ton)
          </Button>
        )}

        <Button onClick={() => copyToClipBoard()} size="s">
          Referrals
        </Button>
      </div>
    </div>
  );
}
