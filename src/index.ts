import * as Discord from "discord.js";
import { getGroups } from "./utils/permissions";
import { getRandomReply } from "./replies";
import { swearFilter } from "./utils/stringUtils";
import { commands } from "./commands";

const logger = require("winston");
const auth = require("../auth.json");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true,
});
logger.level = "debug";

// Initialize Discord Bot
var client: Discord.Client = new Discord.Client({});
client.on("ready", () => {
  logger.info("Connected");
  logger.info(client.user.tag + " - (" + client.user.id + ")");
});

const RoomIds = {
  "701176798859231233": 1,
  "706289944087494706": 2,
  "702639156576256062": 3, // test room
};

client.on("message", async (message) => {
  const delimeter = message.content.substring(0, 1);
  const gameNumber = RoomIds[message.channel.id];

  if (swearFilter(message)) {
    return;
  }

  if (delimeter === "!" || delimeter === ".") {
    const allMembers = await message.guild?.members.fetch();
    var args = message.content.substring(1).split(" ");
    var cmd = args[0].toLowerCase();

    const additional_args = args.splice(1);

    const messagePermGroups = getGroups(message);

    const desiredCommand = Object.keys(commands).find((key) => {
      const auth = commands[key].permissionGroups.every((group) =>
        messagePermGroups.includes(group)
      );
      if (auth) {
        return commands[key].triggers.includes(cmd);
      }
      return false;
    });

    if (desiredCommand) {
      logger.info(
        `[G${gameNumber}] ${desiredCommand} Command, more_args = [${additional_args}]`
      );
      commands[desiredCommand].callback(message, additional_args, gameNumber);
      return;
    } else {
      logger.info(`Couldn't understand what user said. `);
      message.reply(getRandomReply("invalidCommand"));
      return;
    }
  }
});

client.login(auth.token);
