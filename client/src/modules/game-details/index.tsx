import * as React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import IState from 'src/redux/states';
import {
  retrieveGame,
} from 'src/redux/actions'


interface IProps {
  
}

const GamesDetails: React.FC<IProps> = (props: IProps) => {
  const {
    
  } = props;

  const {
    data,
    isLoading,
    err,
  } = useSelector((state: IState) => {
      return state.games.listGames;
  });

  const dispatch = useDispatch();
  const params = useParams();

  React.useEffect(() => {
    const gameId: string = (params as any).id;
    console.log('dispatching', gameId);
    dispatch(retrieveGame(gameId));
  }, []);

  
  return (
    <>
      games details
      {JSON.stringify({data, isLoading, err})}
    </>
  );
}

export default GamesDetails;
