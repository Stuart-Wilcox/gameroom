import { Router } from 'express';
import { getUser, validate } from '../helpers';
import { Room, User } from '../../models';

const router = Router();

/**
 * Returns all rooms available to a user, which means all public rooms and all private rooms where the user has been invited
 */
router.get('/', async (req, res) => {
  // const user = await getUser(req, res);
  // if (!user) {
  //   return;
  // }
  const user = req.user as any;

  Room.find({
    isActive: true,
  }).or([
    { isPrivate: true, invitedMembers: user._id },
    { isPrivate: true, creator: user._id },
    { isPrivate: false },
  ]).sort(
    'created'
  ).populate(
    'creator'
  ).exec((err, rooms) => {
    if (err) {
      return res.status(500).json({ err });
    }

    return res.json(rooms);
  });
});

/**
 * Creates a new room using the given parameters
 */
router.post('/', async (req, res) => {
  const {
    name,
    isPrivate,
  } = req.body;

  const err = await validate({ name });
  if (err) {
    res.status(400).json({ err });
    return;
  }

  const creator = req.user;

  const newRoom = new Room({
    name,
    isPrivate,
    isActive: true,
    creator,
  });

  try {
    const room = await newRoom.save();
    res.json({ room });
    return;
  } catch (err) {
    res.status(500).json({ err });
    return;
  }
});

/**
 * Removes a room with the given id
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // TODO remove room
});

/**
 * Retrieves a room with the given id
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // TODO retrieve details for room  
});

/**
 * Updates a room with the given id
 */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  // TODO update details for room
});

/**
 * Invites a member to the room
 */
router.put('/:id/inviteMember', (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  // TODO invite member
});

/**
 * Uninvites a member from the group
 */
router.put('/:id/uninviteMember', (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  // TODO invite member
});

export default router;