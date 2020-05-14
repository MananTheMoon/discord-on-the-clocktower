import * as Discord from "discord.js";
import { removeNicknamePrefix } from "../utils/nicknameUtils";
import { getMembersInGame } from "../utils/memberUtils";

export const reset = (message: Discord.Message, gameNumber: number = 1) => {
  message.guild.members
    .fetch()
    .then(
      (members) => {
        members = getMembersInGame(members, gameNumber);
        members.each((member) => {
          if (member && member.nickname) {
            member
              .setNickname(removeNicknamePrefix(member.nickname))
              .catch((err) => {
                console.log(`Failed to update ${member.user.username}`, err);
              });
          }
        });
      },
      () => {}
    )
    .catch((err) => console.log(err));
};
