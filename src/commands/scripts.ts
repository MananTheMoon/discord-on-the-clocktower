import { Message } from "discord.js";
import * as scriptsDict from "../../data/scripts.json";
import { getRandomReply } from "../replies";
// import { setScript as setScriptState } from "../utils/gameState";
import { toUnformattedKey } from "../utils/stringUtils";

export const scripts = (message: Message) => {
  message.channel.send(
    "The following scripts are known:\n" +
      "```\n" +
      Object.keys(scriptsDict)
        .map((key, i) => (scriptsDict[key]?.length ? `${i + 1}. ${key}\n` : ""))
        .join("") +
      "```\n"
  );
};

// TODO (Manan) - Complete setScript functionality
export const setScript = (message: Message, additional_args: string[] = []) => {
  const script: [] = scriptsDict[toUnformattedKey(additional_args.join(" "))];
  if (!script) {
    message.channel.send(getRandomReply("scriptNotFound"));
  }
};
