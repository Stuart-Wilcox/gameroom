import * as fs from 'fs';
import mongoose from './mongoose';

const GameTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  allGameSettings: {
    type: Object,
  },
});

export interface IGameTypeFields {
  id: string,
  name: string,
  allGameSettings: any,
}
interface IGameType extends mongoose.Document {
  id: string,
  name: string,
  allGameSettings: any,  
};

const GameType = mongoose.model<IGameType>('GameType', GameTypeSchema);

export default GameType;

export const dropTable = async () => {
  await GameType.deleteMany({});
}

export const loadFixtures = async () => {
    // read the file
    const file = fs.readFileSync('src/models/fixtures/GameType.json', 'utf8');
    const data = JSON.parse(file);
    GameType.collection.insertMany(data, (err, result) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log(`Inserted ${result.insertedCount} rows`);
        }
    });
};