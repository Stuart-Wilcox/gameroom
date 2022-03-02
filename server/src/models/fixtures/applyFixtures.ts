import { Model } from 'mongoose';
import GameType from '../GameType';
import gameTypeFixtures from './GameTypeFixtures';

export const applyFixtures = (model: Model<any>, fixtures: any[], queryField='name') => {
    console.log(`Applying ${fixtures.length} Fixture(s) for ${model.modelName}`);

    // see if the fixtures exist
    fixtures.forEach(async (fixture) => {
        // check if it exists
        const result = await model.findOne({ [queryField]: fixture[queryField] });
        if (!result) {
            await model.create(fixture);
        }
    });
};

export default () => {
    applyFixtures(GameType, gameTypeFixtures);
};
