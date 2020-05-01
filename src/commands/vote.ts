import * as Discord from "discord.js";
import { setVoted } from "../utils/nicknameUtils";
import { getMemberFromSeat } from "../utils/memberUtils";

export const vote = (
  message: Discord.Message,
  additional_args: string[] = []
) => {
  if (additional_args.length) {
    const voteSeat = Number(additional_args[0].replace("_", ""));
    if (!isNaN(voteSeat)) {
      getMemberFromSeat(message.guild.members, voteSeat).then((member) => {
        member.setNickname(setVoted(member.nickname));
      });
    }
    return;
  }

  if (message.member && message.member.nickname) {
    message.member.setNickname(setVoted(message.member.nickname));
  }
};
