import { Message, MessageEmbed } from "discord.js";
import { getRandomReply } from "../replies";
import { removeNicknamePrefix } from "../utils/nicknameUtils";

export const announce = (message: Message, additional_args: string[] = []) => {
  if (!additional_args.length) {
    message.channel.send(getRandomReply("badAnnounce"));
    return;
  }
  const announcer = removeNicknamePrefix(message.member.nickname || "");
  const announcement = message.content.replace(/^[.!]announce /, "");

  const embedMessage = new MessageEmbed()
    .setColor("#00ff00")
    .setAuthor(announcer, message.member.user.avatarURL())
    .setDescription(announcement);

  message.channel
    .send(embedMessage)
    .then((fulfilled) => {
      fulfilled.pin();
    })
    .catch((e) => {
      console.log("Failed promise");
      message.channel.send(getRandomReply("genericError"));
    });
};
