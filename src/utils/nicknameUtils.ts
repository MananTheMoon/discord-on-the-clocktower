const FULL_PREFIX_REGEX = /^_[0-9👻✅ ]*/;
const FULL_PREFIX_MATCHING = /^(_[0-9👻✅]*)+/;

const NUMBER_PREFIX_REGEX = /^_[0-9]*[ ]*/;

const getNicknamePrefix = (nickname: string) => {
  const match = nickname.match(FULL_PREFIX_REGEX);
  if (match) {
    return match[0];
  }
};

export const setDead = (nickname: string): string => {
  return setUndead(nickname).replace(FULL_PREFIX_MATCHING, "$1👻✅");
};

export const setVoted = (nickname: string): string => {
  return nickname.replace(/[✅]/g, "");
};

export const setUndead = (nickname: string): string => {
  return nickname.replace(/[👻✅]/g, "");
};

export const removeNicknamePrefix = (nickname: string) => {
  return nickname.replace(FULL_PREFIX_REGEX, "").trim();
};

export const setNicknamePrefixNumber = (nickname: string, number: number) => {
  const newNick = nickname.replace(NUMBER_PREFIX_REGEX, "");
  return `_${String(number).padStart(2, "0")} ${newNick}`;
};

export const getNumberFromPrefix = (nickname: string): number => {
  const numberPrefix = nickname.match(NUMBER_PREFIX_REGEX);
  if (numberPrefix) {
    return Number(numberPrefix[0].trim().replace("_", ""));
  }
  return -1;
};

// TODO (Manan): Make this set of utils only act on strings, not members. Return updated nickname strings
