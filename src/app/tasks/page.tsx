"use client";
import { useUser } from "@/hooks/useUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import {
  Caption,
  Cell,
  Checkbox,
  Section,
  Title,
} from "@telegram-apps/telegram-ui";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
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
    <div className="h-full relative">
      <Title
        className="p-5 sticky top-0 z-50 backdrop-blur-lg"
        level="3"
        weight="1"
      >
        Tasks
      </Title>

      <div className="grid grid-cols-2 px-5 pb-8 gap-2 ">
        {(userTasksQuery.data || []).map((item: Task, index) => (
          <div key={item.Id}>
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

      <div className=" absolute bottom-4 left-5">
        <Caption level="1" weight="2" className="text-blue-300">
          Streaks: {streaks}
        </Caption>
      </div>
    </div>
  );
}

export default TaskPage;
