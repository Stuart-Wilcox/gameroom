import * as React from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import IState from 'src/redux/states';
import {
    GameType,
} from 'src/redux/states/games';
import {
    listGamesThunk,
} from 'src/redux/actions/games';
import {
    Button,
    Loading,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from 'src/modules/common';
import StartNewGameModal from './StartNewGameModal';
import {
    StyledNewGame, 
} from './index.style';


interface IProps {
    roomId: string;
    roomName: string;
};

const NewGame: React.FC<IProps> = (props: IProps) => {
    const {
        roomId,
        roomName,
    } = props;

    const dispatch = useDispatch();
    const [newGameModalOpen, setNewGameModalOpen] = React.useState<boolean>(false);
    const [gameName, setGameName] = React.useState<string>('');

    const {
        data,
        isLoading,
        err,
    } = useSelector((state: IState) => {
        return state.games.listGames;
    });

    React.useEffect(() => {
        dispatch(listGamesThunk());
    }, []);

    if (isLoading) {
        return (
            <StyledNewGame>
                <Loading />
            </StyledNewGame>
        );
    }

    const handleCreateNewGame = (gameTypeId: string) => {

    };

    const handleNewGameModalClose = () => {
        setNewGameModalOpen(false);
    }

    return (
        <StyledNewGame>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        !!data ?
                        (data || []).map((gameType: GameType) => (
                            <TableRow
                                key={gameType._id}
                            >
                                <TableCell>
                                    {gameType.name}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleCreateNewGame(gameType._id)}
                                    >
                                        Start New Game
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                        :
                        null
                    }
                </TableBody>
            </Table>
            <StartNewGameModal
                roomId={roomId}
                roomName={roomName}
                gameName={gameName}
                open={newGameModalOpen}
                onClose={handleNewGameModalClose}
                onComplete={handleNewGameModalClose}
                onError={handleNewGameModalClose}                
            />
        </StyledNewGame>
    );
};

export default NewGame;