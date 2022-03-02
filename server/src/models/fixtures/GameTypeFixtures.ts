import { IGameTypeFields } from '../GameType';
const gameTypeFixtures: IGameTypeFields[] = [
    {
        "id": "",
        "name": "Boggle",
        "allGameSettings": {
            "timeLimit": {
                "label": "Time Limit",
                "type": "select",
                "options": [
                    { "key": "1 Minute", "value": "1 Minute" },
                    { "key": "2 Minutes", "value": "2 Minutes" },
                    { "key": "3 Minutes", "value": "3 Minutes" },
                    { "key": "4 Minutes", "value": "4 Minutes" },
                    { "key": "5 Minutes", "value": "5 Minutes" },
                ]
            }
        }
    }
];

export default gameTypeFixtures;