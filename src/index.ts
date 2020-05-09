import * as Discord from "discord.js";
import { reset } from "./commands/reset";
import { play } from "./commands/play";
import { unplay } from "./commands/unplay";
import { shuffle } from "./commands/shuffle";
import { undead, dead } from "./commands/dead";
import { authGuildMessage, authStoryTell } from "./utils/permissions";
import { vote } from "./commands/vote";
import { count } from "./commands/count";
import { storytell, unStorytell } from "./commands/storytell";
import { help } from "./commands/help";
import { nominate } from "./commands/nominate";
import { getRandomReply } from "./replies";
import { character } from "./commands/character";
import { swearFilter } from "./utils/stringUtils";
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

client.on("message", (message) => {
  const delimeter = message.content.substring(0, 1);

  if (swearFilter(message)) {
    return;
  }

  if (delimeter === "!" || delimeter === ".") {
    var args = message.content.substring(1).split(" ");
    var cmd = args[0].toLowerCase();

    const additional_args = args.splice(1);

    // Command for anyone in the game room
    if (authGuildMessage(message)) {
      if (cmd == "play") {
        logger.info(`Play Command, more_args = [${additional_args}]`);
        play(message, additional_args);
        return;
      } else if (cmd == "unplay") {
        logger.info(`Unplay Command, more_args = [${additional_args}]`);
        unplay(message, additional_args);
        return;
      } else if (["k", "kill", "dead"].includes(cmd)) {
        logger.info(`Dead Command, more_args = [${additional_args}]`);
        dead(message, additional_args);
        return;
      } else if (["undead", "unkill"].includes(cmd)) {
        logger.info(`Undead Command, more_args = [${additional_args}]`);
        undead(message, additional_args);
        return;
      } else if (["vote", "voted"].includes(cmd)) {
        logger.info(`Vote Command, more_args = [${additional_args}]`);
        vote(message, additional_args);
        return;
      } else if (["n", "nom", "nominate", "nominiates"].includes(cmd)) {
        logger.info(`Nom Command, more_args = [${additional_args}]`);
        nominate(message, additional_args);
        return;
      }
    }

    // Storyteller only commands
    if (authStoryTell(message) && authGuildMessage(message)) {
      if (cmd == "reset") {
        logger.info(`!Reset Command`);
        reset(message);
        return;
      } else if (cmd == "storytell") {
        logger.info(`Storytell Command, more_args = [${additional_args}]`);
        storytell(message);
        return;
      } else if (cmd == "unstorytell") {
        logger.info(`Unstorytell Command, more_args = [${additional_args}]`);
        unStorytell(message, additional_args);
        return;
      } else if (cmd == "shuffle") {
        logger.info(`Shuffle Command`);
        shuffle(message);
        return;
      }
    }

    if (cmd === "count") {
      count(message, additional_args);
      return;
    }

    if (cmd === "help") {
      help(message);
      return;
    }

    if (["c", "char", "character", "characters"].includes(cmd)) {
      logger.info(`Char Command, more_args = [${additional_args}]`);
      character(message, additional_args);
      return;
    }

    message.reply(getRandomReply("invalidCommand"));
  }
});

client.login(auth.token);
