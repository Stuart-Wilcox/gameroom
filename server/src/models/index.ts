export { default as User } from './User';
export { default as Room } from './Room';
export { default as Game } from './Game';
export { default as GameType } from './GameType';

export { validateMFAToken } from './User';

import { dropTable as dropUsers } from './User';
import { dropTable as dropRooms } from './Room';
import { dropTable as dropGames } from './Game';
import { dropTable as dropGameTypes } from './GameType';
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
  console.log('Dropping game types');
  await dropGameTypes();
};

import { loadFixtures as loadGameTypes} from './GameType';
export const loadData = async () => {
  if (process.env.PRODUCTION) {
    console.log('Failed to execute command in production');
    return;
  }

  await loadGameTypes();
  console.log('Loaded GameTypes');
};