import { Router } from 'express';
import { getUser, validate } from '../helpers';
import { Game, Room, User } from '../../models';

const router = Router();

/**
 * Returns all games available to a user, which means all games in which they are a player
 */
router.get('/', async (req, res) => {
  const user = await getUser(req, res);
  if (!user) {
    return;
  }

  Game.find({
    isActive: true,
    players: { id: user.id },
  }).sort(
    'created'
  ).exec((err, games) => {
    if (err) {
      return res.status(500).json({ err });
    }

    return res.json(games);
  });
});

/**
 * Creates a new game using the given parameters
 */
router.post('/', async (req, res) => {
  const user = await getUser(req, res);
  if (!user) {
    return;
  }

  const {
    name,
    room,
    gameSettings,
  } = req.body;

  const err = await validate({ name, room, gameSettings });
  if (err) {
    res.status(400).json({ err });
    return;
  }

  if (!name) {
    res.status(400).json({ err: 'Field name is required' })
    return;
  }

  // ensure room is valid
  try {
    const validRoom = await Room.findOne({ id: room, isActive: true })
    if (!validRoom) {
      res.status(400).json({ err: 'Invalid room given' });
      return;
    }
  } catch (err) {
    res.status(500).json({ err });
    return;
  }

  const newGame = new Game({
    name,
    room,
    gameSettings,
    isActive: true,
  });

  try {
    const game = newGame.save();
    res.json({ game });
    return;
  } catch (err) {
    res.status(500).json({ err });
    return;
  }
});

/**
 * Removes a room with the given id
 */
router.delete('/', (req, res) => {
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
  // TODO update details for room
});

/**
 * Invites a member to the room
 */
router.put('/:id/inviteMember', (req, res) => {
  const { id } = req.params;
  // TODO invite member
});

/**
 * Uninvites a member from the group
 */
router.put('/:id/uninviteMember', (req, res) => {
  const { id } = req.params;
  // TODO invite member
});

export default router;