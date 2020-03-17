import * as UUID from 'uuid';
import mongoose from './mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  mfaToken: {
    type: {
      value: { type: String, required: false },
      expires: { type: Date },
    },
  },
  currentRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    default: null,
  },
});

interface IUser extends mongoose.Document {
  id: string,
  username: string,
  email: string,
  isActive: boolean,
  mfaToken: { value: string|null, expires: Date },
  currentRoom: string|null;
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;

export const validateMFAToken = (user: IUser, mfaToken: string) => {
  if (user.mfaToken) {
    const { expires, value } = user.mfaToken;
    if (expires && value) {
      // check expiration
      const now = new Date();
      if (now.getTime() > expires.getTime()) {
        return { err: 'Token expired' };
      }

      // check value
      if (value !== mfaToken) {
        return { err: 'Incorrect token' };
      }

      // user is valid, clean up mfa token
      setImmediate(() => {
        user.mfaToken = { value: null, expires: new Date(0) };
        user.save();
      });
      return { success: 'User validated' };
    }

    return { err: 'Token does not exist' };
  }

  return { err: 'Unexpected error occurred' }
};

export const dropTable = async () => {
  await User.deleteMany({});
};