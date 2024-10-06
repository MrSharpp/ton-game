"use client";
import React, { type PropsWithChildren } from "react";

import { Root } from "@/components/Root/Root";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "normalize.css/normalize.css";
import "./_assets/globals.css";
import AppTabBar from "@/components/TabBar/AppTabBar";
import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
} from "@tanstack/react-query";
import { UserProvider } from "./user-provider";

const queryClient = new QueryClient();

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" style={{ backgroundColor: "black", background: "black" }}>
      <body>
        <QueryClientProvider client={queryClient}>
          <Root>
            <UserProvider>
              <div
                style={{
                  height: "100vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    height: "calc(100vh - 82px)",
                  }}
                >
                  {children}
                </div>

                <div style={{ height: "82px" }}>
                  <AppTabBar />
                </div>
              </div>
            </UserProvider>
          </Root>
        </QueryClientProvider>
      </body>
    </html>
  );
}
