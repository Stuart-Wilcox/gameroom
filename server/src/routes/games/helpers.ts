import { Game, Room, User } from '../../models';

export const list = async (userId: string) => {
  return Game.find({
    isActive: true,
    players: { id: userId },
  }).sort(
    'created'
  );
};

export const create = async (creator: string, roomId: string, name: string, gameSettings: any) => {
    // ensure room is valid
  const validRoom = await Room.findOne({ id: roomId, isActive: true })
  if (!validRoom) {
    return undefined
  }

  const game = new Game({
    name,
    room: validRoom.id,
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
  return Game.findOne({
    isActive: true,
    players: { id: userId },
  }).sort(
    'created'
  ).populate(
    'players'
  );
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