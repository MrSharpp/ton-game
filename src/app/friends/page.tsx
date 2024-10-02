"use client";
import {
  Avatar,
  Cell,
  List,
  Navigation,
  Section,
} from "@telegram-apps/telegram-ui";
import React from "react";

type Props = {};

const arr = new Array(15).fill(0).map((_, i) => i);

function page({}: Props) {
  return (
    <Section>
      <Section.Header
        style={{
          paddingBottom: 20,
          position: "sticky",
          top: 0,
          zIndex: 40,
          backdropFilter: "blur(15px)",
        }}
      >
        Friends
      </Section.Header>

      <List>
        {arr.map((a) => (
          <Cell key={a} before={<Avatar />} after={<Navigation />}>
            Friend {a}
          </Cell>
        ))}
      </List>
    </Section>
  );
}

export default page;
