import * as Discord from "discord.js";

export enum Group {
  Storyteller = "storyteller",
  RoomMember = "roomMember",
}

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

export const getGroups = (message: Discord.Message): Group[] => {
  return [
    ...(authGuildMessage(message) ? [Group.RoomMember] : []),
    ...(authStoryTell(message) ? [Group.Storyteller] : []),
  ];
};
