import * as Discord from "discord.js";
import { removeNicknamePrefix, setStoryTeller } from "../utils/nicknameUtils";
import { getMemberFromSeat } from "../utils/memberUtils";

export const storytell = (
  message: Discord.Message,
  additional_args: string[] = [],
  gameNumber: number = 1
) => {
  const currentNick = message.member.nickname || message.member.user.username;
  if (message.member) {
    message.member.setNickname(setStoryTeller(currentNick, gameNumber));
  }
};

export const unStorytell = (
  message: Discord.Message,
  additional_args: string[] = []
) => {
  if (additional_args.length) {
    getMemberFromSeat(message.guild.members, 0).then((member) => {
      member.setNickname(removeNicknamePrefix(member.nickname));
    });
    return;
  }

  message.member.setNickname(removeNicknamePrefix(message.member.nickname));
};
