import { Message } from "discord.js";
import * as scriptsDict from "../../data/scripts.json";
import * as nightOrder from "../../data/night-order.json";
import { getRandomReply } from "../replies";
import { toUnformattedKey } from "../utils/stringUtils";

export const order = (message: Message, additional_args: string[] = []) => {
  if (!additional_args.length) {
    message.channel.send(getRandomReply("invalidCommand"));
    return;
  }
  const script: string[] =
    scriptsDict[toUnformattedKey(additional_args.join(" "))];
  if (!script) {
    message.channel.send(getRandomReply("scriptNotFound"));
  }

  let error = false;
  const firstNightSorted = nightOrder["firstNight"].filter((char) => {
    return script.includes(toUnformattedKey(char));
  });
  const otherNightSorted = nightOrder["otherNight"].filter((char) =>
    script.includes(toUnformattedKey(char))
  );

  if (error) {
    message.channel.send(getRandomReply("genericError"));
    return;
  }

  message.channel.send(
    "First Night Order:\n```\n" +
      firstNightSorted.join("\n") +
      "```\n" +
      "Other Night Order:\n```\n" +
      otherNightSorted.join("\n") +
      "```"
  );
};
