import { Router } from 'express';
import { search } from './helpers';

const router = Router();

router.get('/', async (req, res) => {
  const user = req.user as any;
  const { username } = req.query;
  const users = search(user._id, username);
  return res.json({ users });
});

export default router;