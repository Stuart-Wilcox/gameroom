import * as UUID from 'uuid';
import mongoose from './mongoose';

const RoomSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => UUID(),
  },
  created: {
    type: Date,
    default: () => new Date()
  },
  name: {
    type: String,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  invitedMembers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

interface IRoom extends mongoose.Document {
  id: string,
  created: Date,
  name: string,
  isPrivate: boolean,
  creator: string,
  invitedMembers: string[],
  isActive: boolean,
};

const Room = mongoose.model<IRoom>('Room', RoomSchema);

export default Room;

export const dropTable = async () => {
  await Room.deleteMany({});
}