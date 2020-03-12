import { Router } from 'express';
import { validate } from '../utils';
import {
  list,
  create,
  remove,
  retrieve,
  update,
  inviteMember,
  uninviteMember,
} from './helpers';

const router = Router();

/**
 * Returns all rooms available to a user, which means all public rooms and all private rooms where the user has been invited
 */
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
    isPrivate,
  } = req.body;

  const err = await validate({ name });
  if (err) {
    return res.status(400).json({ err });
  }

  const room = await create(user._id, name, isPrivate);
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
  const { name, isPrivate } = req.body;
  const user = req.user as any;

  const err = await validate({ id });
  if (err) {
    return res.status(400).json({ err });
  }

  const room = update(user._id, id, name, isPrivate);
  if (room) {
    return res.json({ room });
  }

  return res.status(404).json({ err: `Room id: ${id} not found` });
});

/**
 * Invites a member to the room
 */
router.put('/:id/inviteMember', async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ err: 'User not found' });
  }

  const { id } = req.params;
  const { userId } = req.body;
  const user = req.user as any;

  const err = await validate({ id, userId });
  if (err) {
    return res.status(400).json({ err });
  }

  const room = inviteMember(user._id, id, userId);
  if (room) {
    return res.json({ room });
  }

  return res.status(404).json({ err: `Room id ${id} or User ${userId} not found` });
});

/**
 * Uninvites a member from the group
 */
router.put('/:id/uninviteMember', async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ err: 'User not found' });
  }

  const { id } = req.params;
  const { userId } = req.body;
  const user = req.user as any;
  
  const err = await validate({ id, userId });
  if (err) {
    return res.status(400).json({ err });
  }

  const room = uninviteMember(user._id, id, userId);
  if (room) {
    return res.json({ room });
  }

  return res.status(404).json({ err: `Room id ${id} or User ${id} not found` });
});

export default router;