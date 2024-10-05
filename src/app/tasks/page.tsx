"use server";
import { prismaClient } from "@/db/prisma-client";
import {
  Card,
  Cell,
  Checkbox,
  Section,
  Title,
} from "@telegram-apps/telegram-ui";
import React from "react";

type Props = {};

const days = new Array(10).fill(0).map((_, i) => i + 1);

async function TaskPage({}: Props) {
  const tasks = await prismaClient.task.findMany();

  return (
    <Section>
      <Title
        className="p-5 sticky top-0 z-50 backdrop-blur-xl "
        level="3"
        weight="1"
      >
        Tasks
      </Title>

      <div className="grid grid-cols-2 px-8 pb-8">
        {days.map((day) => (
          <div key={day} className="p-2">
            <Cell
              Component={"label"}
              before={
                <Checkbox name="check" className="checkbox" value={day} />
              }
              className="rounded-md border border-green-600"
            >
              Day #{day}
            </Cell>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default TaskPage;
