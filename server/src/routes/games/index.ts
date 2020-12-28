import { Router } from 'express';
import { validate } from '../utils';
import {
  list,
  create,
  remove,
  retrieve,
  update,
} from './helpers';

const router = Router();

/**
 * Returns all games available to a user, which means all games in which they are a player
 */
router.get('/', async (req, res) => {
  const user = req.user as any;

  const games = await list(user.id);
  return res.json({ games });
});

/**
 * Creates a new game using the given parameters
 */
router.post('/', async (req, res) => {
  const user = req.user as any;
  const {
    room,
    name,
    gameSettings,
  } = req.body;

  const err = await validate({ name, room, gameSettings });
  if (err) {
    return res.status(400).json({ err });
  }

  const game = await create(user.id, room, name, gameSettings);
  if (game) {
    return res.json({ game });
  }

  return res.status(404).json({ err: `Unable to create game, please ensure Room id ${room} exists` });
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

  const game = await remove(user.id, id);
  if (game) {
    return res.json({ game });
  }

  return res.status(404).json({ err: `Game id ${id} not found` });
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

  const game = await retrieve(user.id, id);
  if (game) {
    return res.json({ game });
  }
  
  return res.status(404).json({ err: `Game id ${id} not found` });
});

/**
 * Updates a room with the given id
 */
router.put('/:id', async (req, res) => {
  const user = req.user as any;
  const { id } = req.params;
  const { name, gameSettings } = req.body;

  const err = await validate({ id });
  if (err) {
    return res.status(400).json({ err });
  }

  const game = await update(user.id, id, name, gameSettings);
  if (game) {
    return res.json({ game });
  }

  return res.status(404).json({ err: `Game id ${id} not found` });
});

export default router;