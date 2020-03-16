import { Room, User } from '../../models';

export const list = async (userId: string) => {
   return Room
    .find({
      isActive: true,
    }).or([
      { isPrivate: true, invitedMembers: userId },
      { isPrivate: true, creator: userId },
      { isPrivate: false },
    ]).sort(
      'created'
    ).populate(
      'creator'
    );
};

export const create = async (creator: string, name: string, isPrivate: boolean) => {
  const newRoom = new Room({
    name,
    isPrivate,
    isActive: true,
    creator,
  });

  return newRoom.save();
};

export const remove = async (creator: string, _id: string) => {
  return Room.findOneAndRemove({
    _id,
    isActive: true,
    creator,
  });
};

export const retrieve = async (creator: string, _id: string) => {
  return Room
    .findOne({
      _id,
      isActive: true,
    }).or([
      { isPrivate: true, invitedMembers: creator },
      { isPrivate: true, creator },
      { isPrivate: false },
    ]);
};

export const update = async (creator: string, _id: string, name?: string, isPrivate?: boolean) => {
  const room = await Room.findOne({ _id, creator });
  if (!room) {
    return undefined;
  }

  // not undefined, null, false, empty string, etc
  if (!!name) {
    room.name = name;
  }
  // can be 'false' but not undefined
  if (isPrivate !== undefined) {
    room.isPrivate = isPrivate;
  }

  return room.save();
};

export const inviteMember = async (creator: string, _id: string, userId: string) => {
  const room = await Room.findOne({ _id, creator, isPrivate: true });
  if (!room) {
    return undefined;
  }

  // check if user is already invited
  if (room.invitedMembers.includes(userId)) {
    return room;
  }

  // validate given user actually exists
  const invitedUser = await User.findById(userId);
  if (!invitedUser) {
    return undefined;
  }

  // TODO put limit on number of members in a room here!

  room.invitedMembers = [...room.invitedMembers, userId];
  return room.save();
};

export const uninviteMember = async (creator: string, _id: string, userId: string) => {
  const room = await Room.findOne({ _id, creator, isPrivate: true });
  if (!room) {
    return undefined;
  }

  // check if user has not already been invited
  if (!room.invitedMembers.includes(userId)) {
    return room;
  }

  // validate given user actualy exists
  const uninvitedUser = await User.findById(userId);
  if (!uninvitedUser) {
    return undefined;
  }

  room.invitedMembers = room.invitedMembers.filter(member => member !== userId);
  return room.save();
};

export const joinRoom = (userId: string, roomId: string) => {

};

export const leaveRoom = (userId: string, roomId: string) => {
  
};