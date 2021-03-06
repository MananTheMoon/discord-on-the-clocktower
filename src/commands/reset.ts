import * as Discord from "discord.js";
import { removeNicknamePrefix } from "../utils/nicknameUtils";
import { getMembersInGame } from "../utils/memberUtils";

export const reset = (
  message: Discord.Message,
  additional_args: string[] = [],
  gameNumber: number = 1
) => {
  const members = getMembersInGame(message.guild.members.cache, gameNumber);
  members.each((member) => {
    if (member && member.nickname) {
      member.setNickname(removeNicknamePrefix(member.nickname)).catch((err) => {
        console.log(`Failed to update ${member.user.username}`, err);
      });
    }
  });
};
