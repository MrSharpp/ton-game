"use client";
import { prismaClient } from "@/db/prisma-client";
import { useUser } from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import {
  Card,
  Cell,
  Checkbox,
  Section,
  Title,
} from "@telegram-apps/telegram-ui";
import React, { useEffect, useState } from "react";

type Task = { hour: number; done: boolean };

function TaskPage() {
  const userID = useLaunchParams().initData?.user?.id;
  const user = useUser();

  const userTasksQuery = useQuery({
    queryFn: () => fetch(`/api/tasks/${userID}`).then((res) => res.json()),
    queryKey: [],
    placeholderData: [],
    select(data) {
      if (!data.length)
        return new Array(7).fill(1).map((it, index) => ({
          hour: index + 1,
          done: false,
        }));
    },
  });

  if (userTasksQuery.isLoading) return "Loading....";

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
        {(userTasksQuery.data || []).map((item: Task) => (
          <div key={item.hour} className="p-2">
            <Cell
              Component={"label"}
              before={
                <Checkbox
                  name="check"
                  className="checkbox"
                  onClick={() => {}}
                  value={+item.done}
                />
              }
              className="rounded-md border border-green-600"
            >
              Hour #{item.hour}
            </Cell>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default TaskPage;
