import * as Discord from "discord.js";
import {
  setNicknamePrefixNumber,
  getNumberFromPrefix,
} from "../utils/nicknameUtils";

export const shuffle = (message: Discord.Message) => {
  message.guild.members.fetch().then((members) => {
    const players = members.filter((member) => {
      if (member && member.nickname) {
        return getNumberFromPrefix(member.nickname) > 0;
      }
      return false;
    });

    const numPlayers = players.size;
    const seats = Array.from(Array(numPlayers).keys());
    players.forEach((player) => {
      const seat =
        seats.splice(Math.floor(Math.random() * seats.length), 1)[0] + 1;
      console.log(player.nickname, " -> ", seat);
      player.setNickname(setNicknamePrefixNumber(player.nickname, seat));
    });
  });
};
