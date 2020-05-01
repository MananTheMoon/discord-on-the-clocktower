import * as Discord from "discord.js";
import { removeNicknamePrefix } from "../utils/nicknameUtils";

export const reset = (message: Discord.Message) => {
  message.guild.members
    .fetch()
    .then(
      (members) => {
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
