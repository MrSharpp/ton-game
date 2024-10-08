"use client";
import { useUser } from "@/hooks/useUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { date, useLaunchParams, useUtils } from "@telegram-apps/sdk-react";
import {
  Button,
  Caption,
  Cell,
  Checkbox,
  Headline,
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
    dayjs(user?.lastTaskCompleted).add(1, "minutes")
  );
  const timeLeft = dayjs
    .duration((endTime.unix() - dayjs().unix()) * 1000)
    .asSeconds();

  useEffect(() => {
    const endTime = dayjs(user?.lastTaskCompleted).add(1, "minutes");
    setEndTime(endTime);
    const id = setTimeout(() => {
      initTasks();
    }, timeLeft * 1000);

    return () => clearTimeout(id);
  }, [user?.lastTaskCompleted, timeLeft]);

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

      if (index == 0 && !user?.lastTaskCompleted) {
        enabled = true;
        taskEnabled = true;
      }

      if (index == 0 && user?.lastTaskCompleted && timeLeft < 1 && !item.Id) {
        enabled = true;
        taskEnabled = true;
        console.log(index, timeLeft);
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
  console.log(tasks);

  useEffect(() => {
    initTasks();
  }, [userTasksQuery.data]);

  const taskMutation = useMutation({
    mutationFn: (hour: number) =>
      fetch(`/api/tasks/complete`, {
        body: JSON.stringify({ userId: user?.Id, hour }),
        method: "POST",
      }),
  });

  function resetTasks() {
    return fetch(`/api/tasks/reset`, {
      body: JSON.stringify({
        userId: user?.Id,
      }),
      method: "POST",
    }).then(async () => {
      setTasks([]);
      await fetchUser();
      userTasksQuery.refetch();
    });
  }

  return (
    <div className="h-full relative px-5">
      <h1 className="p-5 sticky top-0 z-50 backdrop-blur-lg font-bold text-xl">
        Tasks
      </h1>

      <div className="grid grid-cols-3  gap-2 mb-2">
        {tasks.map((item: Task, index) => (
          <div key={item.Id}>
            <button
              className="px-5  text-black rounded-xl py-2"
              style={{
                backgroundColor: !!item.Id || !item.enabled ? "gray" : "white",
                fontSize: 15,
              }}
              onClick={async (e) => {
                e.target.disabled = true;
                if (!!item.Id || !item.enabled) return false;

                await taskMutation.mutateAsync(index + 1);
                setStreaks(streaks + 1);
                await userTasksQuery.refetch();
                setUser({
                  ...user,
                  taskStreaks: (user?.taskStreaks || 0) + 1,
                  lastTaskCompleted: new Date(),
                });

                if (index + 1 == userTasksQuery.data?.length) {
                  await resetTasks();
                }
                setEndTime(dayjs().add(1, "minutes"));
              }}
            >
              Claim {index + 1}
            </button>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Caption weight="3">
          <b>Unlock</b> Time Left: <Countdown endTime={endTime} />
        </Caption>
      </div>

      <div>
        <Title weight="3" className="mt-8 mb-5">
          Time streak Task: <b>{user?.taskStreaks ?? 0}</b>
        </Title>

        <Title weight="3">
          Friend streak Task: <b>{user?.friendStreaks ?? 0}</b>
        </Title>
      </div>

      <div className="mt-8 bottom-0">
        <Subheadline level="1" weight="3" className="text-center">
          {"->"} Social Tasks
        </Subheadline>

        <div className="flex flex-col gap-3 mt-5 ml-5 mr-[60px]">
          <div className="flex justify-between">
            <Headline weight="3">X Account</Headline>

            <button
              style={{ backgroundColor: "white", color: "black" }}
              className="px-2 rounded-lg"
              onClick={() =>
                util.openLink(
                  "https://x.com/Aibullsio?t=QgDntFSRp7-hQo8NXdgWyA&s=09"
                )
              }
            >
              Join
            </button>
          </div>

          <div className="flex justify-between">
            <Headline weight="3">Instagram</Headline>
            <button
              style={{ backgroundColor: "white", color: "black" }}
              className="px-2 rounded-lg"
              onClick={() =>
                util.openLink(
                  "https://www.instagram.com/aibulls.io/profilecard/?igsh=MThhM3VoampqbXZi"
                )
              }
            >
              Join
            </button>
          </div>
          <div className="flex justify-between">
            <Headline weight="3">Telegram</Headline>
            <button
              style={{ backgroundColor: "white", color: "black" }}
              className="px-2 rounded-lg"
              onClick={() => util.openLink("https://t.me/+6-qJa49qw2BhNDI1")}
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
