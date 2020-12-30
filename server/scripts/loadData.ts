import { loadData } from '../src/models';

console.log('Starting');

// wait 1 second to connect to db
setTimeout(() => {
  loadData()
    .then(() => console.log('Complete'))
    .catch(err => console.error(err))
    .finally(() => process.exit(0));
}, 1000);