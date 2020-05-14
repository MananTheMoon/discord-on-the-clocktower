import * as Discord from "discord.js";
import { getNumberFromPrefix, getGameNumber } from "./nicknameUtils";

export const getMemberFromSeat = (
  members: Discord.GuildMemberManager,
  seat: number,
  gameNumber: number = 1
): Promise<Discord.GuildMember> => {
  return members.fetch().then((members) => {
    const membersInGame = getMembersInGame(members, gameNumber);
    let desiredMember = null;
    membersInGame.every((member) => {
      if (member && member.nickname) {
        const currentSeat = getNumberFromPrefix(member.nickname);
        if (currentSeat === seat) {
          desiredMember = member;
          return false;
        }
      }
      return true;
    });

    return desiredMember;
  });
};

export const getMembersInGame = (
  members: Discord.Collection<string, Discord.GuildMember>,
  gameNumber: number = 1
) => {
  return members.filter((member) => {
    if (member.nickname && getGameNumber(member.nickname) == gameNumber) {
      return true;
    }
    return false;
  });
};
