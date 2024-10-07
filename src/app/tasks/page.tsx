"use client";
import { useUser } from "@/hooks/useUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLaunchParams, useUtils } from "@telegram-apps/sdk-react";
import {
  Caption,
  Cell,
  Checkbox,
  LargeTitle,
  Subheadline,
  Title,
} from "@telegram-apps/telegram-ui";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
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
  const util = useUtils();
  const [tasks, setTasks] = useState<Task[]>([]);

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

  useEffect(() => {
    if (userTasksQuery.data) {
      const mappedTasks = userTasksQuery.data.map((item, index) => ({
        ...item,
        enabled: shouldTaskBeEnabled(item, index),
      }));
      setTasks(mappedTasks);
    }
  }, [userTasksQuery.data]);

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

  function shouldTaskBeEnabled(task: any, index: number) {
    const prevTask = (userTasksQuery.data || [])[index - 1];

    if (!prevTask && !task.completeTime) return true;

    const newTaskElapsedTimePassed = dayjs().isAfter(
      dayjs(prevTask?.completeTime).add(5, "minutes")
    );

    if (prevTask?.toComplete && newTaskElapsedTimePassed) return false;

    if (newTaskElapsedTimePassed) return true;

    return false;
  }

  return (
    <div className="h-full relative px-5">
      <h1 className="p-5 sticky top-0 z-50 backdrop-blur-lg font-bold text-xl">
        Tasks
      </h1>

      <div className="grid grid-cols-2  pb-8 gap-2 ">
        {tasks.map((item: Task, index) => (
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
                  disabled={!item.enabled}
                />
              }
              className="rounded-md border border-green-600"
            >
              #{index + 1}
            </Cell>
          </div>
        ))}
      </div>
      <Title weight="3">Time streak Task: {user?.taskStreaks}</Title>

      <Title weight="3">Fren streak Task: {user?.friendStreaks}</Title>

      <div className="mt-10">
        <Subheadline level="1" weight="3">
          {"->"} Social Tasks
        </Subheadline>

        <div className="flex flex-col">
          <Caption
            level="1"
            weight="3"
            onClick={() => util.openLink("https://www.instagram.com")}
          >
            Instagram
          </Caption>
          <Caption
            level="1"
            weight="3"
            onClick={() => util.openLink("https://www.x.com")}
          >
            Twitter
          </Caption>
          <Caption
            level="1"
            weight="3"
            onClick={() => util.openLink("https://www.telegram.com")}
          >
            Telegram
          </Caption>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
