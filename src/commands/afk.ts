import * as Discord from "discord.js";
import { setAfk, setNotAfk, setVoted } from "../utils/nicknameUtils";
import { getMemberFromSeat } from "../utils/memberUtils";

export const afk = (
  message: Discord.Message,
  additional_args: string[] = [],
  gameNumber: number = 1
) => {
  if (additional_args.length) {
    const seat = Number(additional_args[0].replace("_", ""));
    if (!isNaN(seat)) {
      getMemberFromSeat(message.guild.members, seat, gameNumber).then(
        (member) => {
          member.setNickname(setAfk(member.nickname));
        }
      );
    }
    return;
  }

  if (message.member && message.member.nickname) {
    message.member.setNickname(setAfk(message.member.nickname));
  }
};

export const notAfk = (
  message: Discord.Message,
  additional_args: string[] = [],
  gameNumber: number = 1
) => {
  if (additional_args.length) {
    const seat = Number(additional_args[0].replace("_", ""));
    if (!isNaN(seat)) {
      getMemberFromSeat(message.guild.members, seat, gameNumber).then(
        (member) => {
          member.setNickname(setNotAfk(member.nickname));
        }
      );
    }
    return;
  }

  if (message.member && message.member.nickname) {
    message.member.setNickname(setNotAfk(message.member.nickname));
  }
};
