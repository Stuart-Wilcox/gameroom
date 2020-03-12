import { Router } from 'express';

import Rooms from './rooms';
import Users from './users';
import Games from './games';

const router = Router();

router.use('/rooms', Rooms);
router.use('/users', Users);
router.use('/games', Games);
router.get('/', (req, res) => res.send('Healthy'));

export default router;