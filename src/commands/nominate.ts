import { Message, MessageEmbed, GuildMember } from "discord.js";
import { getRandomReply } from "../replies";
import { getMemberFromSeat } from "../utils/memberUtils";
import { removeNicknamePrefix } from "../utils/nicknameUtils";

export const nominate = async (
  message: Message,
  additional_args: string[] = [],
  gameNumber: number = 1
) => {
  let nominatingPlayer: GuildMember = null;
  let targetPlayer: GuildMember = null;

  if (!additional_args.length) {
    message.channel.send(getRandomReply("badNominationReplies"));
    return;
  }
  if (additional_args.length === 1) {
    const targetSeat = additional_args[0].replace("_", "");
    nominatingPlayer = message.member;
    targetPlayer = await getMemberFromSeat(
      message.guild.members,
      Number(targetSeat),
      gameNumber
    );
  } else if (additional_args.length === 2) {
    const [nomSeat, targetSeat] = [
      additional_args[0].replace("_", ""),
      additional_args[1].replace("_", ""),
    ];
    nominatingPlayer = await getMemberFromSeat(
      message.guild.members,
      Number(nomSeat),
      gameNumber
    );

    targetPlayer = await getMemberFromSeat(
      message.guild.members,
      Number(targetSeat),
      gameNumber
    );
  }

  if (nominatingPlayer && targetPlayer) {
    const nomNick = removeNicknamePrefix(nominatingPlayer.nickname);
    const targetNick = removeNicknamePrefix(targetPlayer.nickname);
    const embedMessage = new MessageEmbed()
      .setColor("#ff4000")
      .setAuthor(nomNick, nominatingPlayer.user.avatarURL())
      .setDescription(`${nomNick} nominates ${targetNick} for execution`)
      .setThumbnail(targetPlayer.user.avatarURL());

    message.channel.send(embedMessage).catch((e) => {
      console.log("Failed promise");
      message.channel.send(getRandomReply("genericError"));
    });
  } else {
    message.channel.send(getRandomReply("badNominationReplies"));
  }
};
