import * as Discord from "discord.js";

export const authGuildMessage = (message: Discord.Message): boolean => {
  return message.guild !== null;
};

export const authStoryTell = (message: Discord.Message): boolean => {
  if (!message.member) {
    return false;
  }
  return message.member.roles.cache.some((value) => {
    return value.name === "Admin" || value.name === "StoryTeller";
  });
};
