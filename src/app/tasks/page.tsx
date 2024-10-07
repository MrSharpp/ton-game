"use client";
import { prismaClient } from "@/db/prisma-client";
import { useUser } from "@/hooks/useUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import {
  Card,
  Cell,
  Checkbox,
  Section,
  Title,
  Text,
  Caption,
} from "@telegram-apps/telegram-ui";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { COUNT_OF_TASKS } from "../constants";

dayjs.extend(utc);
dayjs.extend(timezone);

type Task = { toComplete: boolean; Id: number };
const tz = dayjs.tz.guess();

function debugDayjs(day: Dayjs, text?: string) {
  const format = "DD/MM - hh/mm";
  console.log(text, day.tz(tz).format(format));
}

function TaskPage() {
  const userID = useLaunchParams().initData?.user?.id;
  const { user, fetchUser } = useUser();
  const [streaks, setStreaks] = useState(user?.taskStreaks ?? 0);

  const userTasksQuery = useQuery({
    queryFn: () => fetch(`/api/tasks/${userID}`).then((res) => res.json()),
    queryKey: ["tasks", userID],
    placeholderData: [],
    select(data) {
      let items = new Array(COUNT_OF_TASKS)
        .fill({ toComplete: true })
        .map((item, index) => data[index] || item);
      return items;
    },
  });

  const taskMutation = useMutation({
    mutationFn: (hour: number) =>
      fetch(`/api/tasks/complete`, {
        body: JSON.stringify({ userId: user?.Id, hour }),
        method: "POST",
      }),
  });

  function resetTasks() {
    fetch(`/api/tasks/reset`, {
      body: JSON.stringify({
        userId: user?.Id,
      }),
      method: "POST",
    }).then(async () => {
      await fetchUser();
      userTasksQuery.refetch();
    });
  }

  function shouldTaskBeEnabled(task: Task, index: number) {
    const prevTask = (userTasksQuery.data || [])[index - 1];

    if (!prevTask) return true;

    if (prevTask?.toComplete) return false;

    const newTaskElapsedTimePassed = dayjs().isAfter(
      dayjs(prevTask?.completeTime).add(8, "hours")
    );

    if (newTaskElapsedTimePassed) return true;

    return false;
  }

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
        {(userTasksQuery.data || []).map((item: Task, index) => (
          <div key={item.Id} className="p-2">
            <Cell
              Component={"label"}
              before={
                <Checkbox
                  name="check"
                  className="checkbox"
                  onChange={async (e) => {
                    e.target.disabled = true;
                    taskMutation.mutate(index + 1);
                    setStreaks(streaks + 1);

                    if (index + 1 == userTasksQuery.data?.length) {
                      resetTasks();
                    }
                  }}
                  defaultChecked={!item.toComplete}
                  disabled={!shouldTaskBeEnabled(item, index)}
                />
              }
              className="rounded-md border border-green-600"
            >
              #{index + 1}
            </Cell>
          </div>
        ))}
      </div>

      <Section.Footer>
        <Caption level="1" weight="2">
          Streaks: {streaks}
        </Caption>
      </Section.Footer>
    </Section>
  );
}

export default TaskPage;
