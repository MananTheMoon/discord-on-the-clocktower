import { Message, MessageEmbed } from "discord.js";
import { getMembersInGame } from "../utils/memberUtils";
import { getIsDead, getNumberFromPrefix } from "../utils/nicknameUtils";
import { ICharacterCount } from "./count";
import * as CharacterCounts from "../../data/character-counts.json";
import { getRandomReply } from "../replies";

export const townSquare = async (message: Message, gameNumber: number = 1) => {
  const players = getMembersInGame(
    await message.guild.members.fetch(),
    gameNumber
  );

  const embedMessage = new MessageEmbed().setColor("#ff4000");
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
      townSquareDescription.push(
        player.nickname.replace(/^[_]+([0-9]+)/, "$1. ")
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
  embedMessage.setDescription(townSquareDescription.join("\n"));

  message.channel.send(embedMessage).catch((e) => {
    console.log("Failed promise");
    message.channel.send(getRandomReply("genericError"));
  });
};
