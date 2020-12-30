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
import {
    StyledNewGame, 
} from './index.style';


interface IProps {

};

const NewGame: React.FC<IProps> = (props: IProps) => {
    const dispatch = useDispatch();

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

    console.log('GAMES', data);

    const handleCreateNewGame = (gameTypeId: string) => {

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
        </StyledNewGame>
    );
};

export default NewGame;