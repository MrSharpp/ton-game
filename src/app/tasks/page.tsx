"use client";
import { useUser } from "@/hooks/useUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { date, useLaunchParams, useUtils } from "@telegram-apps/sdk-react";
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
import { useCallback, useEffect, useMemo, useState } from "react";
import { COUNT_OF_TASKS } from "../constants";
import useCountDown from "react-countdown-hook";
import duration, { Duration } from "dayjs/plugin/duration";

dayjs.extend(duration);

dayjs.extend(utc);
dayjs.extend(timezone);

const interval = 1000; // interval to change remaining time amount, defaults to 1000

type Task = { toComplete: boolean; Id: number };
const tz = dayjs.tz.guess();

function debugDayjs(day: Dayjs, text?: string) {
  const format = "DD/MM - hh/mm";
  console.log(text, day.tz(tz).format(format));
}

export const Countdown: React.FC<any> = ({ endTime, cb }) => {
  const [time, setTime] = useState<string>();

  useEffect(() => {
    const currentTime = dayjs();
    const diffTime = endTime.unix() - currentTime.unix();

    let duration = dayjs.duration(diffTime * 1000, "milliseconds");
    const interval = 1000;

    const id = setInterval(function () {
      duration = dayjs.duration(
        duration.asMilliseconds() - interval,
        "milliseconds"
      );

      if (duration.asMilliseconds() < 1) {
        return setTime(`0h 0m 0s`);
      }

      let timestamp = `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
      setTime(timestamp);
    }, interval);

    return () => clearInterval(id);
  }, [endTime]);

  return <>{time}</>;
};

function TaskPage() {
  const userID = useLaunchParams().initData?.user?.id;
  const { user, fetchUser, setUser } = useUser();
  const [streaks, setStreaks] = useState(user?.taskStreaks ?? 0);
  const util = useUtils();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [endTime, setEndTime] = useState(
    dayjs(user?.lastTaskCompleted).add(5, "minutes")
  );
  const timeLeft = dayjs
    .duration((endTime.unix() - dayjs().unix()) * 1000)
    .asSeconds();

  useEffect(() => {
    const endTime = dayjs(user?.lastTaskCompleted).add(5, "minutes");
    setEndTime(endTime);
    const id = setTimeout(() => {
      initTasks();
    }, timeLeft * 1000);

    return () => clearTimeout(id);
  }, [user?.lastTaskCompleted]);

  const userTasksQuery = useQuery({
    queryFn: () => fetch(`/api/tasks/${userID}`).then((res) => res.json()),
    queryKey: ["tasks", userID],
    placeholderData: [],
    select(data) {
      let items = new Array(COUNT_OF_TASKS)
        .fill({ enabled: false })
        .map((item, index) => data[index] || item);
      return items;
    },
  });

  function initTasks() {
    if (!userTasksQuery.data?.length) return;

    let taskEnabled = false;
    const mappedTasks = userTasksQuery.data.map((item, index) => {
      let enabled = false;
      if (taskEnabled) return item;

      if (index == 0) {
        if (user?.lastTaskCompleted && timeLeft < 1) enabled = true;
        if (!user?.lastTaskCompleted) enabled = true;
      }

      if (timeLeft < 1 && !item.Id) {
        enabled = true;
        taskEnabled = true;
      }

      return {
        ...item,
        enabled,
      };
    });

    setTasks(mappedTasks);
  }

  useEffect(() => {
    initTasks();
  }, [userTasksQuery.data]);

  console.log(tasks);

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

  return (
    <div className="h-full relative px-5">
      <h1 className="p-5 sticky top-0 z-50 backdrop-blur-lg font-bold text-xl">
        Tasks
      </h1>

      <div className="grid grid-cols-2  gap-2 mb-2">
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
                    userTasksQuery.refetch();
                    setUser({
                      ...user,
                      taskStreaks: (user?.taskStreaks || 0) + 1,
                      lastTaskCompleted: new Date(),
                    });

                    if (index + 1 == userTasksQuery.data?.length) {
                      resetTasks();
                      initTasks();
                    }
                    setEndTime(dayjs().add(5, "minutes"));
                  }}
                  defaultChecked={!!item.Id}
                  disabled={!item.enabled || !!item.Id}
                />
              }
              className="rounded-md border border-green-600"
            >
              #{index + 1}
            </Cell>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Caption weight="3">
          Next Task In: <Countdown endTime={endTime} />
        </Caption>
      </div>

      <Title weight="3" className="mt-8 mb-5">
        Time streak Task: {user?.taskStreaks}
      </Title>

      <Title weight="3">Friend streak Task: {user?.friendStreaks ?? 0}</Title>

      <div className="mt-8 ">
        <Subheadline level="1" weight="3" className="text-center">
          {"->"} Social Tasks
        </Subheadline>

        <div className="flex flex-col gap-1">
          <Caption
            level="2"
            weight="3"
            onClick={() =>
              util.openLink(
                "https://www.instagram.com/aibulls.io/profilecard/?igsh=MThhM3VoampqbXZi"
              )
            }
          >
            Instagram
          </Caption>
          <Caption
            level="1"
            weight="3"
            onClick={() =>
              util.openLink(
                "https://x.com/Aibullsio?t=QgDntFSRp7-hQo8NXdgWyA&s=09"
              )
            }
          >
            Twitter
          </Caption>
          <Caption
            level="1"
            weight="3"
            onClick={() => util.openLink("https://t.me/+6-qJa49qw2BhNDI1")}
          >
            Telegram
          </Caption>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
