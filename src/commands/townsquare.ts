import { Message, MessageEmbed } from "discord.js";
import { getMembersInGame } from "../utils/memberUtils";
import { getIsDead, getNumberFromPrefix } from "../utils/nicknameUtils";
import { ICharacterCount } from "./count";
import * as CharacterCounts from "../../data/character-counts.json";
import { getRandomReply } from "../replies";
import { getGameState, setLastTownSquareMessage } from "../utils/gameState";

export const townSquare = async (message: Message, gameNumber: number = 1) => {
  const townSquareDescription = await getTownSquareContent(message, gameNumber);
  const embedMessage = new MessageEmbed()
    .setColor("#ff4000")
    .setDescription(townSquareDescription);

  return message.channel
    .send(embedMessage)
    .catch((e) => {
      console.log("Failed promise");
      message.channel.send(getRandomReply("genericError"));
    })
    .then((fulfilled) => {
      if (fulfilled) {
        setLastTownSquareMessage(gameNumber, fulfilled);
      }
    });
};

export const getTownSquareContent = async (
  message: Message,
  gameNumber: number = 1
) => {
  const players = getMembersInGame(message.guild.members.cache, gameNumber);

  const gameState = getGameState(gameNumber);

  let townSquareDescription = [];
  let livingPlayers = 0;
  let deadPlayers = 0;

  players
    .sort((a, b) => (a.nickname > b.nickname ? 1 : -1))
    .forEach((player) => {
      if (!player.nickname || getNumberFromPrefix(player.nickname) < 1) {
        return;
      }
      if (!getIsDead(player.nickname)) {
        livingPlayers++;
      } else {
        deadPlayers++;
      }
      let handRaisedText = "";
      switch (gameState.raisedHands[getNumberFromPrefix(player.nickname)]) {
        case true:
          handRaisedText = "🖖";
          break;
        case false:
          handRaisedText = "⍱";
          break;
        default:
          handRaisedText = "";
      }

      townSquareDescription.push(
        `${player.nickname.replace(/^[_]+([0-9]+)/, "$1. ")} ${handRaisedText}`
      );
    });

  const cc: ICharacterCount = CharacterCounts[livingPlayers + deadPlayers];
  if (cc) {
    townSquareDescription.push(
      `${cc.townsfolk} / ${cc.outsider} / ${cc.minion} / ${cc.demon}`
    );
  }
  townSquareDescription.push(`**${livingPlayers}** players left alive.`);
  townSquareDescription.push(
    `**${Math.round(livingPlayers / 2)}** votes to execute.`
  );

  console.log(townSquareDescription);

  return townSquareDescription.join("\n");
};
