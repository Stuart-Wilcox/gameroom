import { dropTables } from '../src/models';

console.log('Starting');

// wait 1 second to connect to db
setTimeout(() => {
  dropTables()
    .then(() => console.log('Complete'))
    .catch(err => console.error(err))
    .finally(() => process.exit(0));
}, 1000);