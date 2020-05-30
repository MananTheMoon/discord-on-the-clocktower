import { Message } from "discord.js";
import { getRandomReply } from "../replies";

export const timer = (message: Message, additional_args: string[] = []) => {
  let inputTime: string;
  let time: number = 5; // TODO (change to a sane input (0))
  if (!additional_args.length) {
    message.channel.send(getRandomReply("badTimerReplies"));
    return;
  }
  if (additional_args.length == 1) {
    inputTime = additional_args[0];
  } else if (additional_args.length == 2) {
    inputTime = additional_args[0] + additional_args[1];
  }

  if (inputTime) {
    const match = inputTime.match("([0-9]+)([a-zA-Z]*)");
    if (!match || match.length < 3) {
      message.channel.send(getRandomReply("badTimerReplies"));
      return;
    }
    time = Number(match[1]) * getTimeUnitMultipler(match[2]);
  }

  message.channel.send(setTimerMessage(time)).then((timerMessage) => {
    const interval = setInterval(() => {
      time--;
      if (time % 5 == 0 || time < 10) {
        timerMessage.edit(setTimerMessage(time > 0 ? time : 0));
      }

      if (time <= 0) {
        console.log(message.channel);
        message.channel.send(`<#${message.channel.id}>Timer complete!`);
        clearInterval(interval);
      }
    }, 1000);
  });
};

const setTimerMessage = (time: number) => {
  return `Timer: ${formatTime(time)} left`;
};

const formatTime = (time: number) => {
  const m = Math.floor(time / 60);
  const s = time % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const getTimeUnitMultipler = (timeUnit: string) => {
  if (["s", "sec", "second", "seconds"].includes(timeUnit)) {
    return 1;
  } else if (["m", "min", "minute", "minutes"].includes(timeUnit)) {
    return 60;
  }
  return 1;
};
