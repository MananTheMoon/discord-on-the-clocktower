import { Message } from "discord.js";

export const toUnformattedKey = (str: string) => {
  // Takes a string and makes it non-spaced lower-case
  // e.g. "Scarlet Woman" --> "scarlet-woman"
  return str.toLowerCase().trim().replace(/ /g, "_").replace("'", "");
};

const filterWords = [
  {
    match: /fuck/gi,
    replace: "fork",
  },
  {
    match: /shit/gi,
    replace: "shirt",
  },
  {
    match: /asshol/gi,
    replace: "casserol",
  },
];

export const swearFilter = (message: Message): boolean => {
  let text = message.content;
  filterWords.forEach((filter) => {
    text = text.replace(filter.match, filter.replace);
  });
  if (text !== message.content) {
    message.reply(`I think you meant to say:\n> ${text}`);
    message.delete();
    return true;
  }
  return false;
};
