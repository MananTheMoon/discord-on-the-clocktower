import * as Discord from "discord.js";
import * as CharacterCounts from "../../data/character-counts.json";
import { getRandomReply } from "../replies";
// Manan (TODO)
// Print the number of each type of character
// given the current player count (or accept a param to print out that many)

const FULL_COUNT_IMG =
  "https://media.discordapp.net/attachments/701121836423053362/701124887309189160/player_count_chart.png";

export interface ICharacterCount {
  townsfolk: number;
  outsider: number;
  minion: number;
  demon: number;
}

export const count = (
  message: Discord.Message,
  additional_args: string[] = []
) => {
  if (additional_args.length) {
    const requestedCount = additional_args[0];
    console.log(requestedCount);
    const cc: ICharacterCount = CharacterCounts[requestedCount];
    if (cc) {
      message.channel.send(
        `For ${requestedCount} Players, the counts are: \n` +
          ` **${cc.townsfolk}** Townsfolk\n` +
          ` **${cc.outsider}** Outsider(s)\n` +
          ` **${cc.minion}** Minion(s)\n` +
          ` **${cc.demon}** Demon`
      );
    } else {
      message.channel.send(getRandomReply("badCountReplies"));
    }
    return;
  }
  message.channel.send(FULL_COUNT_IMG);
};
