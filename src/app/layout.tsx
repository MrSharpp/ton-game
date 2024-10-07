"use client";
import { Root } from "@/components/Root/Root";
import AppTabBar from "@/components/TabBar/AppTabBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";
import { UserProvider } from "./user-provider";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "normalize.css/normalize.css";
import "./_assets/globals.css";
import "./styles.css";

const queryClient = new QueryClient();

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" style={{ backgroundColor: "black", background: "black" }}>
      <body>
        <QueryClientProvider client={queryClient}>
          <Root>
            <UserProvider>
              <div className="h-screen flex flex-col">
                <div
                  style={{
                    height: "calc(100vh - 82px)",
                    overflow: "scroll",
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
