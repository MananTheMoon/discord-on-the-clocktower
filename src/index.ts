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
import { timer } from "./commands/timer";
import { townSquare } from "./commands/townsquare";
import { announce } from "./commands/announce";
import { raiseHand, lowerHand } from "./commands/handVoting";
import { scripts, getScript } from "./commands/scripts";
import { order } from "./commands/order";
import { afk, notAfk } from "./commands/afk";
import { mute, unmute } from "./commands/mute";
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

    // Command for anyone in the game room
    if (authGuildMessage(message)) {
      if (cmd == "play") {
        logger.info(
          `[G${gameNumber}]Play Command, more_args = [${additional_args}]`
        );
        play(message, additional_args, gameNumber);
        return;
      } else if (cmd == "unplay") {
        logger.info(
          `[G${gameNumber}]Unplay Command, more_args = [${additional_args}]`
        );
        unplay(message, additional_args, gameNumber);
        return;
      } else if (["k", "kill", "dead"].includes(cmd)) {
        logger.info(
          `[G${gameNumber}]Dead Command, more_args = [${additional_args}]`
        );
        dead(message, additional_args, gameNumber);
        return;
      } else if (["undead", "unkill"].includes(cmd)) {
        logger.info(
          `[G${gameNumber}]Undead Command, more_args = [${additional_args}]`
        );
        undead(message, additional_args, gameNumber);
        return;
      } else if (["vote", "voted"].includes(cmd)) {
        logger.info(
          `[G${gameNumber}]Vote Command, more_args = [${additional_args}]`
        );
        vote(message, additional_args, gameNumber);
        return;
      } else if (["n", "nom", "nominate", "nominiates"].includes(cmd)) {
        logger.info(
          `[G${gameNumber}]Nom Command, more_args = [${additional_args}]`
        );
        nominate(message, additional_args, gameNumber);
        return;
      } else if (["timer", "time"].includes(cmd)) {
        logger.info(
          `[G${gameNumber}] Timer Command, more_args = [${additional_args}]`
        );
        timer(message, additional_args);
        return;
      } else if (["ts", "townsquare"].includes(cmd)) {
        logger.info(
          `[G${gameNumber}] Town Square Command, more_args = [${additional_args}]`
        );
        townSquare(message, gameNumber);
        return;
      } else if (["afk", "away"].includes(cmd)) {
        logger.info(
          `[G${gameNumber}] Away Command, more_args = [${additional_args}]`
        );
        afk(message, additional_args, gameNumber);
        return;
      } else if (["notafk", "unafk", "here"].includes(cmd)) {
        logger.info(
          `[G${gameNumber}] Away Command, more_args = [${additional_args}]`
        );
        notAfk(message, additional_args, gameNumber);
        return;
      } else if (["announce", "public"].includes(cmd)) {
        logger.info(
          `[G${gameNumber}] Announce Command, more_args = [${additional_args}]`
        );
        announce(message, additional_args);
        return;
      } else if (["up", "yes", "raise"].includes(cmd)) {
        logger.info(
          `[G${gameNumber}] Hand Up Command, more_args = [${additional_args}]`
        );
        raiseHand(message, additional_args, gameNumber);
        return;
      } else if (["down", "no", "lower"].includes(cmd)) {
        logger.info(
          `[G${gameNumber}] Hand Up Command, more_args = [${additional_args}]`
        );
        lowerHand(message, additional_args, gameNumber);
        return;
      } else if (
        [
          "unmute",
          "umute",
          "unsilence",
          "unquiet",
          "unmuted",
          "speak",
        ].includes(cmd)
      ) {
        logger.info(
          `[G${gameNumber}] Unmute Command, more_args = [${additional_args}]`
        );
        unmute(message, additional_args, gameNumber);
        return;
      } else if (["..", ".", "..."].includes(cmd) || cmd.startsWith("..")) {
        logger.info(
          `[G${gameNumber}] Ellipsis Command, more_args = [${additional_args}]`
        );
        message.channel.send(getRandomReply("ellipsis"));
        return;
      }
    }

    // Storyteller only commands
    if (authStoryTell(message) && authGuildMessage(message)) {
      if (cmd == "reset") {
        logger.info(`!Reset Command`);
        reset(message, gameNumber);
        return;
      } else if (cmd == "storytell") {
        logger.info(`Storytell Command, more_args = [${additional_args}]`);
        storytell(message, gameNumber);
        return;
      } else if (cmd == "unstorytell") {
        logger.info(`Unstorytell Command, more_args = [${additional_args}]`);
        unStorytell(message, additional_args);
        return;
      } else if (cmd == "shuffle") {
        logger.info(`Shuffle Command`);
        shuffle(message, gameNumber);
        return;
      } else if (["mute", "silence", "quiet", "muted"].includes(cmd)) {
        logger.info(
          `[G${gameNumber}] Mute Command, more_args = [${additional_args}]`
        );
        mute(message, additional_args, gameNumber);
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

    // Commands that are supported in DMs
    if (["c", "char", "character", "characters"].includes(cmd)) {
      logger.info(`Char Command, more_args = [${additional_args}]`);
      character(message, additional_args);
      return;
    } else if (["scripts"].includes(cmd)) {
      logger.info(
        `[G${gameNumber}] Scripts Command, more_args = [${additional_args}]`
      );
      scripts(message);
      return;
    } else if (["script"].includes(cmd)) {
      logger.info(
        `[G${gameNumber}] Get Script Command, more_args = [${additional_args}]`
      );
      getScript(message, additional_args);
      return;
    } else if (["order", "night-order", "ord", "night_order"].includes(cmd)) {
      logger.info(
        `[G${gameNumber}] Script Command, more_args = [${additional_args}]`
      );
      order(message, additional_args);
      return;
    }

    message.reply(getRandomReply("invalidCommand"));
  }
});

client.login(auth.token);
