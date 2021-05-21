import * as Discord from "discord.js";
import { Group } from "./utils/permissions";
import { reset } from "./commands/reset";
import { play } from "./commands/play";
import { unplay } from "./commands/unplay";
import { shuffle } from "./commands/shuffle";
import { undead, dead } from "./commands/dead";
import { vote } from "./commands/vote";
import { count } from "./commands/count";
import { storytell, unStorytell } from "./commands/storytell";
import { help } from "./commands/help";
import { nominate } from "./commands/nominate";
import { character } from "./commands/character";
import { timer } from "./commands/timer";
import { townSquare } from "./commands/townsquare";
import { announce } from "./commands/announce";
import { raiseHand, lowerHand } from "./commands/handVoting";
import { scripts, getScript } from "./commands/scripts";
import { order } from "./commands/order";
import { afk, notAfk } from "./commands/afk";
import { mute, unmute } from "./commands/mute";
import { comeback } from "./commands/comeback";

interface ICommand {
  callback: (
    message: Discord.Message,
    additional_args: string[],
    gameNumber: number
  ) => void;
  triggers: string[];
  permissionGroups: Group[];
}

export const commands: { [key: string]: ICommand } = {
  play: {
    callback: play,
    triggers: ["play"],
    permissionGroups: [Group.RoomMember],
  },
  unplay: {
    callback: unplay,
    triggers: ["unplay"],
    permissionGroups: [Group.RoomMember],
  },
  dead: {
    callback: dead,
    triggers: ["dead", "k", "kill"],
    permissionGroups: [Group.RoomMember],
  },
  undead: {
    callback: undead,
    triggers: ["undead", "uk", "unkill"],
    permissionGroups: [Group.RoomMember],
  },
  vote: {
    callback: vote,
    triggers: ["vote", "voted"],
    permissionGroups: [Group.RoomMember],
  },
  nominate: {
    callback: nominate,
    triggers: ["n", "nom", "nominate", "nominiates"],
    permissionGroups: [Group.RoomMember],
  },
  timer: {
    callback: timer,
    triggers: ["time", "timer"],
    permissionGroups: [Group.RoomMember],
  },
  townSquare: {
    callback: townSquare,
    triggers: ["ts", "townsquare"],
    permissionGroups: [Group.RoomMember],
  },
  afk: {
    callback: afk,
    triggers: ["afk", "away", "afs", "afa"],
    permissionGroups: [Group.RoomMember],
  },
  notAfk: {
    callback: notAfk,
    triggers: ["notafk", "unafk", "here"],
    permissionGroups: [Group.RoomMember],
  },
  announce: {
    callback: announce,
    triggers: ["announce", "public"],
    permissionGroups: [Group.RoomMember],
  },
  raiseHand: {
    callback: raiseHand,
    triggers: ["up", "yes", "raise"],
    permissionGroups: [Group.RoomMember],
  },
  lowerHand: {
    callback: lowerHand,
    triggers: ["down", "no", "lower"],
    permissionGroups: [Group.RoomMember],
  },
  unmute: {
    callback: unmute,
    triggers: ["unmute", "umute", "unsilence", "unquiet", "unmuted", "speak"],
    permissionGroups: [Group.RoomMember],
  },

  // DM supported commands
  help: {
    callback: help,
    triggers: ["h", "help", "man"],
    permissionGroups: [],
  },
  count: {
    callback: count,
    triggers: ["count"],
    permissionGroups: [],
  },
  char: {
    callback: character,
    triggers: ["c", "char", "character", "characters"],
    permissionGroups: [],
  },
  listScripts: {
    callback: scripts,
    triggers: ["scripts"],
    permissionGroups: [],
  },
  getScript: {
    callback: getScript,
    triggers: ["script", "s"],
    permissionGroups: [],
  },
  nightOrder: {
    callback: order,
    triggers: ["order", "night-order", "ord", "night_order"],
    permissionGroups: [],
  },

  // Storyteller/Admin-only commands

  reset: {
    callback: reset,
    triggers: ["reset", "restart"],
    permissionGroups: [Group.RoomMember, Group.Storyteller],
  },
  storytell: {
    callback: storytell,
    triggers: ["storytell", "st"],
    permissionGroups: [Group.RoomMember, Group.Storyteller],
  },
  shuffle: {
    callback: shuffle,
    triggers: ["shuffle"],
    permissionGroups: [Group.RoomMember, Group.Storyteller],
  },
  mute: {
    callback: mute,
    triggers: ["mute", "silence", "quiet", "muted"],
    permissionGroups: [Group.RoomMember, Group.Storyteller],
  },
  comeback: {
    callback: comeback,
    triggers: ["comeback", "return", "opennoms"],
    permissionGroups: [Group.RoomMember, Group.Storyteller],
  },
};
