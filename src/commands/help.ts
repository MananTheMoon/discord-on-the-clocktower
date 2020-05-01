import * as Discord from "discord.js";

// TODO (print help menu)

export const help = (message: Discord.Message) => {
  const help_text =
    "The following commands are supported.\n" +
    "```\n" +
    "General Commands:\n" +
    "  .play       Add yourself to the upcoming game\n" +
    "  .unplay n   Remove yourself (or given seat) from game.\n" +
    "  .shuffle    Randomizes seating order.\n" +
    "  .count n    Shows the role splits for n players\n" +
    "  .dead n     Sets you (or given seat #) as dead.\n" +
    "  .undead n   Sets you (or given seat #) as alive\n" +
    "  .nom x y    You (or Player X) nominates player Y\n" +
    "  .vote n     Uses your (or given seat's) dead vote\n\n" +
    "Admin Stuff:\n" +
    "  .reset        Resets all nicknames in the game\n" +
    "  .storytell    Makes you the storyteller.\n" +
    "  .unstorytell  Makes you not the storyteller.\n" +
    "```\n";

  message.channel.send(help_text);
};
