import * as React from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    useHistory,
} from 'react-router-dom';
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
    const history = useHistory();
    const [newGameModalOpen, setNewGameModalOpen] = React.useState<boolean>(false);
    const [gameDetails, setGameDetails] = React.useState<any>(null);

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

    const handleCreateNewGame = (gameType: any) => {
        setGameDetails(gameType);
        setNewGameModalOpen(true);
    };

    const handleNewGameModalClose = () => {
        setNewGameModalOpen(false);
    };

    const handleNewGameModalComplete = (game: any) => {
        // navigate to game page
        history.push(`/games/${game._id}`);
    };

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
                                        onClick={() => handleCreateNewGame(gameType)}
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
                gameDetails={gameDetails}
                open={newGameModalOpen}
                onClose={handleNewGameModalClose}
                onComplete={handleNewGameModalComplete}
                onError={handleNewGameModalClose}                
            />
        </StyledNewGame>
    );
};

export default NewGame;