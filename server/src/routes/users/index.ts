import { Router, response } from 'express';
import { search } from './helpers';

const router = Router();

router.get('/', async (req, res) => {
  const user = req.user as any;
  const { username } = req.query;
  const { users, err } = await search(user._id, username);
  if (err) {
    return res.status(400).json({ err });
  }
  return res.json({ users });
});

router.get('/currentUser', async (req, res) => {
  const user = req.user as any;
  return res.json({ user });
});

export default router;