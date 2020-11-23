const GAME_PREFIX = /^([_]+)/;
const FULL_PREFIX_GAMES_MATCHING = /^([_]*[0-9😵👻✅]*)+/;
const NUMBER_PREFIX_GAME = /^[_]*[0-9]*[ ]*/;

const GAME_PREFIXES = {
  1: "_",
  2: "__",
  3: "___",
};

export const getGameNumber = (nickname: string) => {
  const gamePrefix = nickname.match(GAME_PREFIX);
  if (gamePrefix) {
    return gamePrefix[0].length;
  }
  return 1;
};

export const setNicknamePrefixNumber = (
  nickname: string,
  number: number,
  game: number = 1
) => {
  const newNick = nickname.replace(NUMBER_PREFIX_GAME, "");
  return `${GAME_PREFIXES[game]}${String(number).padStart(2, "0")} ${newNick}`;
};

export const getNumberFromPrefix = (nickname: string): number => {
  const numberPrefix = nickname.match(NUMBER_PREFIX_GAME);
  if (numberPrefix) {
    return Number(numberPrefix[0].trim().replace(/_/g, ""));
  }
  return -1;
};

export const removeNicknamePrefix = (nickname: string) => {
  return nickname.replace(FULL_PREFIX_GAMES_MATCHING, "").trim();
};

export const getIsDead = (nickname: string): boolean => {
  return nickname.includes("👻");
};

export const setDead = (nickname: string): string => {
  return setUndead(nickname).replace(FULL_PREFIX_GAMES_MATCHING, "$1👻✅");
};

export const setStoryTeller = (nickname: string, game: number = 1): string => {
  return nickname.replace(
    FULL_PREFIX_GAMES_MATCHING,
    `${GAME_PREFIXES[game]}00😵`
  );
};

export const setVoted = (nickname: string): string => {
  return nickname.replace(/[✅]/g, "");
};

export const setUndead = (nickname: string): string => {
  return nickname.replace(/[👻✅]/g, "");
};

// TODO (Manan): Make this set of utils only act on strings, not members. Return updated nickname strings
