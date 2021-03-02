import * as Discord from "discord.js";
import { getMemberFromSeat, getMembersInGame } from "../utils/memberUtils";
import { isStoryTeller } from "../utils/nicknameUtils";

export const mute = (
  message: Discord.Message,
  additional_args: string[] = [],
  gameNumber: number = 1
) => {
  console.log(additional_args);
  if (additional_args.length) {
    const seat = Number(additional_args[0].replace("_", ""));
    if (!isNaN(seat) && seat !== 0) {
      getMemberFromSeat(message.guild.members, seat, gameNumber).then(
        (member) => {
          member.voice.setMute(true);
        }
      );
    } else if (additional_args[0] === "all") {
      const members = getMembersInGame(message.guild.members.cache, gameNumber);
      members.each((member) => {
        if (
          member &&
          member.voice?.mute !== null &&
          !isStoryTeller(member.nickname)
        ) {
          member.voice.setMute(true);
        }
      });
    }
    return;
  }

  if (message.member && message.member.nickname) {
    message.member.voice.setMute(true);
  }
};

export const unmute = (
  message: Discord.Message,
  additional_args: string[] = [],
  gameNumber: number = 1
) => {
  if (additional_args.length) {
    const seat = Number(additional_args[0].replace("_", ""));
    if (!isNaN(seat)) {
      getMemberFromSeat(message.guild.members, seat, gameNumber).then(
        (member) => {
          member.voice.setMute(false);
        }
      );
    } else if (additional_args[0] === "all") {
      const members = getMembersInGame(message.guild.members.cache, gameNumber);
      members.each((member) => {
        if (member && member.voice?.mute !== null) {
          member.voice.setMute(false);
        }
      });
    }
    return;
  }

  if (message.member && message.member.nickname) {
    message.member.voice.setMute(false);
  }
};
