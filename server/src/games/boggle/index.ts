// import SocketClient from 'action-service/lib/client/Client';
import publishEvent from '../publishEvent';

const createGame = async () => {
    
    await publishEvent('boggle_game_started', {});

    await setTimeout(() => {
        publishEvent('boggle_game_ended', {});
    }, 5000);
};

export default createGame;