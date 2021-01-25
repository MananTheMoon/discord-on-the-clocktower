import { Message } from "discord.js";

export const toUnformattedKey = (str: string) => {
  // Takes a string and makes it non-spaced lower-case
  // e.g. "Devil's Advocate" --> "devils_advocate"
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
  {
    match: /cunt/gi,
    replace: "country-music lover",
  },
  {
    match: /prude/gi,
    replace: "provably awesome person",
  },
  {
    match: /bastard/gi,
    replace: "buster",
  },
  {
    match: /(cocaine|meth[ ]*$|meth[ ]+|speed|lsd|heroin)/gi,
    replace: "prescription drugs",
  },
  {
    match: /bitch/gi,
    replace: "bunch",
  },
  {
    match: /lame/gi,
    replace: "lambo",
  },
  {
    match: /damn/gi,
    replace: "darn",
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
