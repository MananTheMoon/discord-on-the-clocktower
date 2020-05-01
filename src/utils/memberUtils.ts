import * as Discord from "discord.js";
import { getNumberFromPrefix } from "./nicknameUtils";

export const getMemberFromSeat = (
  members: Discord.GuildMemberManager,
  seat: number
): Promise<Discord.GuildMember> => {
  return members.fetch().then((members) => {
    let desiredMember = null;
    members.every((member) => {
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
