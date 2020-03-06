import * as UUID from 'uuid';
import mongoose from './mongoose';

const GameSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => UUID(),
  },
  created: {
    type: Date,
    default: () => new Date(),
  },
  name: {
    type: String,
    required: true,
  },
  players: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  gameSettings: {
    type: Object,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

interface IGame extends mongoose.Document {
  id: string,
  created: Date,
  name: string,
  players: string[],
  room: string,
  gameSettings: any,
  isActive: boolean,
};

const Game = mongoose.model<IGame>('Game', GameSchema);

export default Game;

export const dropTable = async () => {
  await Game.deleteMany({});
}