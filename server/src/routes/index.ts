import { Router } from 'express';

import Rooms from './rooms';

const router = Router();

router.use('/rooms', Rooms);
router.get('/', (req, res) => res.send('Hello world'));

export default router;