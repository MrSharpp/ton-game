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
} from "@telegram-apps/telegram-ui";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

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
  const user = useUser();

  useEffect(() => {
    if (!user) return;
    const taskDeadline = dayjs(user?.taskStartTime).add(7, "hours");

    const currentTime = dayjs();

    // if 7hours already passed since taskStartTime
    if (currentTime.isAfter(taskDeadline)) {
      // request to change the taskSTart time to now
      fetch(`/api/tasks/reset`, {
        body: JSON.stringify({ userId: user?.Id }),
        method: "POST",
      });
      userTasksQuery.refetch();
    }
  }, [user?.Id, user?.taskStartTime]);

  const userTasksQuery = useQuery({
    queryFn: () => fetch(`/api/tasks/${userID}`).then((res) => res.json()),
    queryKey: ["tasks", userID],
    placeholderData: [],
    select(data) {
      let items = new Array(7)
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

  function shouldTaskBeEnabled(task: Task, index: number) {
    if (!task.toComplete) return false;

    const currentTime = dayjs().tz(tz);

    const currentTaskStartTime = dayjs(user?.taskStartTime).add(index, "hours");
    const currentTaskEndtime = dayjs(user?.taskStartTime).add(
      index + 1,
      "hours"
    );
    console.log(`-------------------${index}--------------------`);
    debugDayjs(dayjs(user?.taskStartTime), "userStartTime");
    debugDayjs(currentTaskStartTime, "lastTaskEndTime");
    debugDayjs(currentTime, "currentTime");
    debugDayjs(currentTaskEndtime, "currentTaskEndtime");

    if (
      currentTime.isAfter(currentTaskStartTime) &&
      currentTime.isBefore(currentTaskEndtime)
    )
      return true;

    return false;
  }

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
                  }}
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
    </Section>
  );
}

export default TaskPage;
