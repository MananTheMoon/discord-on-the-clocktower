import { Message, MessageEmbed } from "discord.js";
import { toUnformattedKey } from "../utils/stringUtils";
// import * as characters from "../../data/characters.json";

// TODO (Manan) - Define these enumerated types elsewhere

export interface ICharacter {
  set: string;
  type: "townsfolk" | "outsider" | "minion" | "demon" | "fabled";
  team: "good" | "evil";
  image: string;
  desc: string[];
  shortDesc: string;
}
export interface ICharacters {
  [key: string]: ICharacter;
}

const characters = require("../../data/characters.json") as ICharacters;

export const character = (message: Message, additional_args: string[] = []) => {
  if (additional_args.length) {
    const arg = additional_args.join("_");
    if (arg === "list") {
      return characterList(message);
    }

    const charName = toUnformattedKey(arg);
    const character = characters[charName];

    if (character) {
      const description = character.desc?.length
        ? character.desc.join("\n")
        : character.shortDesc;

      const embedMessage = new MessageEmbed();
      embedMessage
        .setThumbnail(character.image)
        .setTitle(arg)
        .setDescription(description);
      message.reply(embedMessage);
      return;
    }
  }

  message.reply("Couldn't find said character.");
  return characterList(message);
};

export const characterList = (message: Message) => {
  const charNames = Object.keys(characters).sort();
  message.reply(
    ["Here is a list of characters I know:", ...charNames].join("\n\t")
  );
};
