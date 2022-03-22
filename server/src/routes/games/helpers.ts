import {
  Game,
  GameType,
  Room,
  User,
} from '../../models';
import type { IRoom } from '../../models/Room';

export const list = () => {
  return GameType.find({});
}

export const listActive = async (userId: string) => {
  return Game.find({
    isActive: true,
    players: { id: userId },
  }).sort(
    'created'
  );
};

export const create = async (creator: string, roomId: string, name: string, gameTypeId: string, gameSettings: any) => {
    // ensure room is valid
  const validRoom = await Room.findOne({ _id: roomId, isActive: true });
  if (!validRoom) {
    return undefined
  }

  const validGameType = await GameType.findOne({ _id: gameTypeId });
  if (!validGameType) {
    return undefined;
  }

  const game = new Game({
    name,
    room: validRoom.id,
    gameType: validGameType.id,
    gameSettings,
    isActive: true,
  });

  return game.save();
};

export const remove = async (userId: string, id: string) => {
  return Game.findOneAndRemove({
    id,
    isActive: true,
    players: { id: userId },
  });
};

export const retrieve = async (userId: string, id: string) => {
  // make sure player is part of room that game is in

  const game = await Game.findOne({
    isActive: true,
    _id: id,
  }).sort(
    'created'
  ).populate(
    'players'
  ).populate('room');

  if (!game) {
    return game;
  }

  const room = (game.room as unknown as IRoom)
  const userCanAccesss = room.currentMembers.includes(userId)

  if (!userCanAccesss) {
    return null;
  }

  return game;
};

export const update = async (userId: string, id: string, name?: string, gameSettings?: any) => {
  const game = await Game.findOne({
    id,
    players: { id: userId },
    isActive: true
  });
  if (!game) {
    return undefined;
  }

  // name cannot be falsey
  if (!!name) {
    game.name = name;
  }

  // game settings cannot be falsey
  if (!!gameSettings) {
    game.gameSettings = gameSettings;
  }

  return game.save();
};