import { Room, User } from '../../models';
import { equalIds } from '../utils';

export const list = async (userId: string) => {
   return Room
    .find({
    }).or([
      { invitedMembers: userId },
      { creator: userId },
    ]).sort(
      'created'
    ).populate(
      'creator'
    );
};

export const create = async (creator: string, name: string) => {
  const newRoom = new Room({
    name,
    creator,
    isActive: false,
    invitedMembers: [],
    currentMembers: [],
  });

  const room = await newRoom.save();
  return Room.populate(room, { path: "creator" });
};

export const remove = async (creator: string, _id: string) => {
  return Room.findOneAndRemove({
    _id,
    isActive: true,
    creator,
  });
};

export const retrieve = async (userId: string, _id: string) => {
  return Room
    .findOne({
      _id,
    }).or([
      { invitedMembers: userId },
      { creator: userId },
    ]).populate(
      'creator'
    ).populate(
      'invitedMembers'
    ).populate(
      'currentMembers'
    );
};

export const update = async (creator: string, _id: string, name?: string) => {
  const room = await Room.findOne({ _id, creator });
  if (!room) {
    return undefined;
  }

  // not undefined, null, false, empty string, etc
  if (!!name) {
    room.name = name;
  }

  return room.save();
};

export const inviteMembers = async (creator: string, _id: string, users: string[]) => {
  const room = await Room.findOne({ _id, creator });
  if (!room) {
    return undefined;
  }

  for (const userId of users) {
    // check if user is already invited
    if (room.invitedMembers.includes(userId)) {
      continue;
    }

    // validate given user actually exists
    const invitedUser = await User.findById(userId);
    if (!invitedUser) {
      continue;
    }

    // TODO put limit on number of members in a room here!
    room.invitedMembers = [...room.invitedMembers, userId];
  }

  await room.save();
  return retrieve(creator, room._id); 
};

export const uninviteMembers = async (creator: string, _id: string, users: string[]) => {
  const room = await Room.findOne({ _id, creator });
  if (!room) {
    return undefined;
  }

  for (const userId in users) {
    // check if user has not already been invited
    if (!room.invitedMembers.includes(userId)) {
      continue;
    }

    // validate given user actualy exists
    const uninvitedUser = await User.findById(userId);
    if (!uninvitedUser) {
      continue;
    }

    room.invitedMembers = room.invitedMembers.filter(member => !equalIds(member, userId));
  }
  
  await room.save();
  return retrieve(creator, room._id); 
};

export const joinRoom = async (userId: string, roomId: string) => {
  const room = await Room
    .findOne({ 
      _id: roomId
    }).or([
      { invitedMembers: userId },
      { creator: userId },
    ]);

    if (!room) {
      return {
        room: undefined,
        err: 'Room not found',
      };
    }

    // check if user has already joined
    if (room.currentMembers.includes(userId)) {
      return {
        room,
        err: 'Already joined',
      };
    }

  // validate given user actualy exists
  const user = await User.findById(userId);
  if (!user) {
    return {
      room,
      err: 'User not found',
    };
  }

  if (user.currentRoom) {
    return {
      room,
      err: 'User is already joined to a room',
    };
  }

  // re-assign user room
  user.currentRoom = room._id;

  // add user to room
  room.currentMembers = [...room.currentMembers, userId];
  // activate room
  room.isActive = true; 
  
  await user.save();
  await room.save();
  return {
    room: await retrieve(userId, room._id),
    err: undefined,
  };
};

export const leaveRoom = async (userId: string, roomId: string) => {
  const room = await Room
    .findOne({ 
      _id: roomId
    }).or([
      { invitedMembers: userId },
      { creator: userId },
    ]);

  if (!room) {
    return {
      room: undefined,
      err: 'Room not found',
    };
  }

  // check if user has already joined
  if (!room.currentMembers.includes(userId)) {
    return {
      room,
      err: 'Not already joined',
    };
  }

  // validate given user actualy exists
  const user = await User.findById(userId);
  if (!user) {
    return {
      room,
      err: 'User not found',
    };
  }

  // re-assign user room
  user.currentRoom = null;

  // remove user from room  
  room.currentMembers = room.currentMembers.filter(member => !equalIds(member, userId));
  // deactivate room
  if (room.currentMembers.length === 0) {
    room.isActive = false;
  }

  await user.save();
  await room.save();

  return {
    room: await retrieve(userId, room._id),
    err: undefined,
  };
};