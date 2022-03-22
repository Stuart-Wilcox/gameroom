import { Router } from 'express';
import { validate } from '../utils';
import {
  list,
  listActive,
  create,
  remove,
  retrieve,
  update,
} from './helpers';
import createGame from '../../games/boggle';

const router = Router();

/**
 * Returns all games available
 */
router.get('/', async (req, res) => {
  const games = await list();
  return res.json({ games });
});

/**
 * Returns all games available to a user, which means all games in which they are a player
 */
router.get('/active', async (req, res) => {
  const user = req.user as any;

  const games = await listActive(user.id);
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
    gameTypeId,
    gameSettings,
  } = req.body;

  const err = await validate({ name, room, gameTypeId, gameSettings });
  if (err) {
    return res.status(400).json({ err });
  }

  const game = await create(user.id, room, name, gameTypeId, gameSettings);
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

/**
 * Starts a game
 */
 router.post('/:id', async (req, res) => {
  const user = req.user as any;
  const { id } = req.params;

  const game = await retrieve(user.id, id);
  if (game) {
    // TODO type of game check
    await createGame();
    return res.json({ 'status': 'game-started' })
  }

  return res.status(404).json({ err: `Unable to retrieve game, please ensure Game id ${game} exists` });
});

export default router;