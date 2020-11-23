import { Message } from "discord.js";

interface IGameState {
  [key: number]: {
    locked: boolean;
    lastTownSquareMessage?: Message;
    raisedHands: {
      [key: number]: boolean;
    };
  };
}

const gameState: IGameState = {
  1: {
    locked: false,
    raisedHands: {},
  },
  2: {
    locked: false,
    raisedHands: {},
  },
  3: {
    locked: false,
    raisedHands: {
      1: true, // TODO Remove
    },
  },
};

export const getGameState = (gameNumber: number = 1) => {
  return gameState[gameNumber];
};

export const lockGame = (gameNumber: number = 1) => {
  gameState[gameNumber].locked = true;
};

export const unlockGame = (gameNumber: number = 1) => {
  gameState[gameNumber].locked = false;
};

export const setHandUp = (playerNumber: number, gameNumber: number = 1) => {
  gameState[gameNumber].raisedHands[playerNumber] = true;
};

export const setHandDown = (playerNumber: number, gameNumber: number = 1) => {
  gameState[gameNumber].raisedHands[playerNumber] = false;
};

export const lowerAllHands = (gameNumber: number = 1) => {
  gameState[gameNumber].raisedHands = {};
};

export const setLastTownSquareMessage = (
  gameNumber: number = 1,
  message: Message
) => {
  gameState[gameNumber].lastTownSquareMessage = message;
  console.log(gameState);
  console.log("^setting Last town square message");
};
