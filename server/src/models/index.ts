export { default as User } from './User';
export { default as Room } from './Room';
export { default as Game } from './Game';

export { validateMFAToken } from './User';

import { dropTable as dropUsers } from './User';
import { dropTable as dropRooms } from './Room';
import { dropTable as dropGames } from './Game';
export const dropTables = async () => {
  if (process.env.PRODUCTION) {
    console.log('Failed to execute command in production');
    return;
  }

  console.log('Dropping users');
  await dropUsers();
  console.log('Dropping rooms');
  await dropRooms();
  console.log('Dropping games');
  await dropGames();
};