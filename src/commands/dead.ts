import * as Discord from "discord.js";
import {
  setDead,
  setUndead,
  removeNicknamePrefix,
} from "../utils/nicknameUtils";
import { getMemberFromSeat } from "../utils/memberUtils";
import { getRandomReply } from "../replies";

export const dead = (
  message: Discord.Message,
  additional_args: string[] = []
) => {
  if (additional_args.length) {
    const killSeat = Number(additional_args[0]);
    if (!isNaN(killSeat)) {
      getMemberFromSeat(message.guild.members, killSeat).then((member) => {
        if (member && member.nickname) {
          member.setNickname(setDead(member.nickname));
          message.channel.send(
            getRandomReply("deadReplies", removeNicknamePrefix(member.nickname))
          );
        }
      });
    }
    return;
  }

  if (message.member && message.member.nickname) {
    message.member.setNickname(setDead(message.member.nickname));
    message.channel.send(
      getRandomReply(
        "deadReplies",
        removeNicknamePrefix(message.member.nickname)
      )
    );
  }
};

export const undead = (
  message: Discord.Message,
  additional_args: string[] = []
) => {
  if (additional_args.length) {
    const unkillSeat = Number(additional_args[0]);
    if (!isNaN(unkillSeat)) {
      getMemberFromSeat(message.guild.members, unkillSeat).then((member) => {
        if (member && member.nickname) {
          member.setNickname(setUndead(member.nickname));
        }
      });
    }
    return;
  }

  message.member.setNickname(setUndead(message.member.nickname));
};
