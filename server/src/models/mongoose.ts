import * as mongoose from 'mongoose';
import { config as envConfig } from 'dotenv';

// sometimes envconfig has not yet run by the time we get here, so run it again just to be safe
envConfig();

const url = process.env['DB_URL'];

if (!url) {
  throw new Error('DB_URL not found. You must set this in the env before starting the server');
}

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log('Failed to connect to db\n', err);
    return;
  }
  console.log('Connected to db');
});
mongoose.set('useCreateIndex', true);
export default mongoose;
