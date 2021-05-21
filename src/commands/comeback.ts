import { getMembersInGame } from "../utils/memberUtils";
import { Message } from "discord.js";
import { isStoryTeller } from "../utils/nicknameUtils";

export const comeback = async (
  message: Message,
  additional_args: string[] = [],
  gameNumber: number = 1
) => {
  gameNumber = 1;

  const players = getMembersInGame(message.guild.members.cache, gameNumber);
  const returnChannel = getTownSquareVoiceChannel(message, gameNumber);

  players.forEach((player) => {
    if (!player.nickname || !player.voice?.channel) {
      return;
    }
    if (player.voice.channel !== returnChannel) {
      player.voice.setChannel(returnChannel);
      player.voice.setMute(true);
      setTimeout(() => {
        player.voice.setMute(false);
      }, 5000);
    }
  });
};

const getTownSquareVoiceChannel = (
  message: Message,
  gameNumber: number = 1
) => {
  const channelName = `BOTC${gameNumber === 1 ? "" : gameNumber} - Town Square`;
  console.log("searching for ", channelName);
  return message.guild.channels.cache.find((c) => c.name === channelName);
};
