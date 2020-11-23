import { Message, MessageEmbed } from "discord.js";
import { getNumberFromPrefix } from "../utils/nicknameUtils";
import { setHandUp, setHandDown, getGameState } from "../utils/gameState";
import { getTownSquareContent } from "./townsquare";

export const raiseHand = async (
  message: Message,
  additional_args: string[] = [],
  gameNumber: number = 1
) => {
  let playerNumber = getNumberFromPrefix(message.member.nickname) || 0;
  if (additional_args.length) {
    playerNumber = Number(additional_args[0]);
    if (!isNaN(playerNumber)) {
      return;
    }
  }
  setHandUp(playerNumber, gameNumber);
  const newEmbed = new MessageEmbed()
    .setColor("#ff4000")
    .setDescription(await getTownSquareContent(message, gameNumber));
  getGameState(gameNumber).lastTownSquareMessage?.edit(newEmbed);
};

export const lowerHand = async (
  message: Message,
  additional_args: string[] = [],
  gameNumber: number = 1
) => {
  let playerNumber = getNumberFromPrefix(message.member.nickname) || 0;
  if (additional_args.length) {
    playerNumber = Number(additional_args[0]);
    if (!isNaN(playerNumber)) {
      return;
    }
  }
  setHandDown(playerNumber, gameNumber);
  const updatedTownDesc = getTownSquareContent(message, gameNumber);
  const newEmbed = new MessageEmbed()
    .setColor("#ff4000")
    .setDescription(await getTownSquareContent(message, gameNumber));
  getGameState(gameNumber).lastTownSquareMessage?.edit(newEmbed);
};
