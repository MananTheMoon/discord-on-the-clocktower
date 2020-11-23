import * as Discord from "discord.js";
import {
  setNicknamePrefixNumber,
  getNumberFromPrefix,
} from "../utils/nicknameUtils";
import { getMembersInGame } from "../utils/memberUtils";

export const play = (
  message: Discord.Message,
  additional_args: string[] = [],
  gameNumber: number = 1
) => {
  const currentNick = message.member.nickname || message.member.user.username;
  if (additional_args.length) {
    const seat = Number(additional_args[0].replace("_", ""));
    if (!isNaN(seat)) {
      message.member.setNickname(
        setNicknamePrefixNumber(currentNick, seat, gameNumber)
      );
    }
    return;
  }

  const membersCache = message.guild.members.cache;
  const membersInGame = getMembersInGame(membersCache, gameNumber);
  let usedSeats = [];
  membersInGame.each((member) => {
    if (member && member.nickname) {
      const memberNumber = getNumberFromPrefix(member.nickname);
      usedSeats.push(memberNumber);
    }
  });

  let playerSeat = 1;
  while (usedSeats.includes(playerSeat)) {
    playerSeat++;
  }

  message.member
    .setNickname(setNicknamePrefixNumber(currentNick, playerSeat, gameNumber))
    .catch((err) => {
      console.log(`Failed to update ${message.member.user.username}`, err);
    });
};
