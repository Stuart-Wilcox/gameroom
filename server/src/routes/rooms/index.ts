import { Router } from 'express';
import { validate } from '../utils';
import {
  list,
  create,
  remove,
  retrieve,
  update,
  inviteMembers,
  uninviteMembers,
  joinRoom,
  leaveRoom,
} from './helpers';

const router = Router();

/**
 * Returns the rooms available to the user, if any */
router.get('/', async (req, res) => {
  const user = req.user as any;
  const rooms = await list(user._id);  
  return res.json({ rooms });
});

/**
 * Creates a new room using the given parameters
 */
router.post('/', async (req, res) => {
  const user = req.user as any;
  const {
    name,
  } = req.body;

  const err = await validate({ name });
  if (err) {
    return res.status(400).json({ err });
  }

  const room = await create(user._id, name);
  return res.json({ room });
});

/**
 * Removes a room with the given id
 */
router.delete('/:id', async (req, res) => {
  const user = req.user as any;
  const { id } = req.params;

  const err = await validate({ id });
  if (err) {
    return res.status(400).json({ err });
  }

  const room = await remove(user._id, id);
  if (room) {
    return res.json({ room });
  }

  return res.status(404).json({ err: `Room id: ${id} not found` });
});

/**
 * Retrieves a room with the given id
 */
router.get('/:id', async (req, res) => {
  const user = req.user as any;
  const { id } = req.params;

  const err = await validate({ id });
  if (err) {
    return res.status(400).json({ err });
  }

  const room = await retrieve(user._id, id);
  if (room) {
    return res.json({ room });
  }

  return res.status(404).json({ err: `Room id: ${id} not found` });
});

/**
 * Updates a room with the given id
 */
router.put('/:id', async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ err: 'User not found' });
  }

  const { id } = req.params;
  const { name } = req.body;
  const user = req.user as any;

  const err = await validate({ id });
  if (err) {
    return res.status(400).json({ err });
  }

  const room = update(user._id, id, name);
  if (room) {
    return res.json({ room });
  }

  return res.status(404).json({ err: `Room id: ${id} not found` });
});

/**
 * Invites a member to the room
 */
router.put('/:id/inviteMembers', async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ err: 'User not found' });
  }

  const { id } = req.params;
  const { users } = req.body;
  const user = req.user as any;

  const err = await validate({ id, users });
  if (err) {
    return res.status(400).json({ err });
  }

  const room = inviteMembers(user._id, id, users);
  if (room) {
    return res.json({ room });
  }

  return res.status(404).json({ err: `Room id ${id} or User in ${users} not found` });
});

/**
 * Uninvites a member from the group
 */
router.put('/:id/uninviteMembers', async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ err: 'User not found' });
  }

  const { id } = req.params;
  const { users } = req.body;
  const user = req.user as any;
  
  const err = await validate({ id, users });
  if (err) {
    return res.status(400).json({ err });
  }

  const room = uninviteMembers(user._id, id, users);
  if (room) {
    return res.json({ room });
  }

  return res.status(404).json({ err: `Room id ${id} or User in ${users} not found` });
});

/**
 * Joins a room
 */
router.post('/:id/join', async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ err: 'User not found' });
  }

  const user = req.user as any;
  const { id } = req.params;

  const { room, err } = await joinRoom(user._id, id);
  if (room) {
    return res.status(400).json({ err });
  }
  
  return res.json({ room });
});

/**
 * Leaves a room
 */
router.post('/:id/leave', async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ err: 'User not found' });
  }

  const user = req.user as any;
  const { id } = req.params;

  const { room, err } = await leaveRoom(user._id, id);
  if (err) {
    return res.status(400).json({ err });
  }
  
  return res.json({ room });
});

export default router;