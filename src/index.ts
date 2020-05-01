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

//const SERVER_ADMIN = "FakeManan";
const SERVER_ADMIN = "701973486301741066";

client.on("message", (message) => {
  const delimeter = message.content.substring(0, 1);
  if (delimeter === "!" || delimeter === ".") {
    var args = message.content.substring(1).split(" ");
    var cmd = args[0].toLowerCase();

    const additional_args = args.splice(1);

    if (authStoryTell(message)) {
      console.log("You are a storyteller");
    }

    if (authGuildMessage(message)) {
      if (cmd == "play") {
        logger.info(`Play Command, more_args = [${additional_args}]`);
        play(message, additional_args);
        return;
      } else if (cmd == "unplay") {
        logger.info(`Unplay Command, more_args = [${additional_args}]`);
        unplay(message, additional_args);
        return;
      } else if (cmd == "shuffle") {
        logger.info(`Shuffle Command`);
        shuffle(message);
        return;
      } else if (cmd == "dead" || cmd == "kill") {
        logger.info(`Dead Command, more_args = [${additional_args}]`);
        dead(message, additional_args);
        return;
      } else if (cmd == "undead" || cmd == "unkill") {
        logger.info(`Undead Command, more_args = [${additional_args}]`);
        undead(message, additional_args);
        return;
      } else if (cmd == "vote" || cmd == "voted") {
        logger.info(`Vote Command, more_args = [${additional_args}]`);
        vote(message, additional_args);
        return;
      } else if (cmd === "nominate" || cmd === "nom") {
        logger.info(`Nom Command, more_args = [${additional_args}]`);
        nominate(message, additional_args);
        return;
      }
    }

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

    message.reply(getRandomReply("invalidCommand"));
  }
});

client.login(auth.token);
