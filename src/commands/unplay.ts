import * as Discord from "discord.js";
import { removeNicknamePrefix } from "../utils/nicknameUtils";
import { getMemberFromSeat } from "../utils/memberUtils";

export const unplay = (
  message: Discord.Message,
  additional_args: string[] = [],
  gameNumber: number = 1
) => {
  if (additional_args.length) {
    const kickSeat = Number(additional_args[0].replace("_", ""));
    if (!isNaN(kickSeat)) {
      getMemberFromSeat(message.guild.members, kickSeat, gameNumber).then(
        (member) => {
          if (member && member.nickname) {
            member.setNickname(removeNicknamePrefix(member.nickname));
          }
        }
      );
    }
    return;
  }

  if (message.member && message.member.nickname) {
    message.member
      .setNickname(removeNicknamePrefix(message.member.nickname))
      .catch((err) => {
        console.log(`Failed to update ${message.member.user.username}`, err);
      });
  }
};
