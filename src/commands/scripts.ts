import { Message, MessageEmbed } from "discord.js";
import * as scriptsDict from "../../data/scripts.json";
import { getRandomReply } from "../replies";
// import { setScript as setScriptState } from "../utils/gameState";
import { toUnformattedKey } from "../utils/stringUtils";
import { ICharacters } from "./character";

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

export const getScript = (message: Message, additional_args: string[] = []) => {
  if (!additional_args.length) {
    message.channel.send(getRandomReply("invalidCommand"));
    return;
  }
  const scriptName = additional_args.join(" ");
  const script: string[] = scriptsDict[toUnformattedKey(scriptName)];
  if (!script) {
    message.channel.send(getRandomReply("scriptNotFound"));
    return scripts(message);
  }

  const characters = require("../../data/characters.json") as ICharacters;

  const formattedChars: { [key: string]: string[] } = {
    townsfolk: [],
    outsider: [],
    minion: [],
    demon: [],
    other: [],
  };

  script.forEach((charName) => {
    const character = characters[charName] || {
      type: "other",
      shortDesc: "couldn't find character description",
      image: "",
    };

    // const spacesToAdd = ".".repeat(20 - charName.length);
    formattedChars[character.type].push(
      `**${charName}**: ${character.shortDesc}`
    );
  });

  message.channel.send(`**${scriptName.toUpperCase()}**\n`);

  message.channel.send(
    "-----------------Townsfolk-----------------\n" +
      formattedChars.townsfolk.join("\n")
  );
  message.channel.send(
    "-----------------Outsiders-----------------\n" +
      formattedChars.outsider.join("\n")
  );
  message.channel.send(
    "\n-----------------Minions-----------------\n" +
      formattedChars.minion.join("\n")
  );
  message.channel.send(
    "\n-----------------Demons-----------------\n" +
      formattedChars.demon.join("\n")
  );
  return;
};

// TODO (Manan) - Complete setScript functionality
export const setScript = (message: Message, additional_args: string[] = []) => {
  const script: [] = scriptsDict[toUnformattedKey(additional_args.join(" "))];
  if (!script) {
    message.channel.send(getRandomReply("scriptNotFound"));
  }
};
