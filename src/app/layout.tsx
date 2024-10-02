import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { Root } from "@/components/Root/Root";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "normalize.css/normalize.css";
import "./_assets/globals.css";
import { Tabbar } from "@telegram-apps/telegram-ui";
import AppTabBar from "@/components/TabBar/AppTabBar";

export const metadata: Metadata = {
  title: "Your Application Title Goes Here",
  description: "Your application description goes here",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" style={{ backgroundColor: "black", background: "black" }}>
      <body>
        <Root>
          <div
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ height: "calc(100vh - 82px)", overflow: "scroll" }}>
              {children}
            </div>

            <div style={{ height: "82px" }}>
              <AppTabBar />
            </div>
          </div>
        </Root>
      </body>
    </html>
  );
}
