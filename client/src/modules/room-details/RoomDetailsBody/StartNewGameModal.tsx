import * as React from 'react';
import { connect } from 'react-redux'

import IState from 'src/redux/states';
import { createGame as performCreateGame } from 'src/redux/actions';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from 'src/modules/common';

interface IProps {
  roomId: string;
  roomName?: string;
  gameName?: string;
  open: boolean;
  onClose: () => void;
  onComplete: (room: any) => void;
  onError: (err: string) => void;

  // game: any;
  // isLoading: boolean;
  // err: string;
  // createGame: (gameId: string) => void;
}

const CreateGameModal: React.FC<IProps> = (props: IProps) => {
  const {
    roomId,
    roomName,
    gameName,
    open,
    onClose,
    onComplete,
    onError,

    // game,
    // isLoading,
    // err,
    // createGame,
  } = props;

  const isLoading = false;
  const err: any = null;
  const game: any = null;

  // send complete if detected
  React.useEffect(() => {
    if (!isLoading && !err) {
      // clear and close the modal
      onComplete(game);
      setImmediate(() => {
        onClose();
      });
    }
  }, [isLoading]);

  // send error if detected
  React.useEffect(() => {
    if (err) {
      onError(err);
    }
  }, [err]);

  const handleClose = () => {
    // don't close if loading
    if (isLoading) {
      return;
    }

    onClose();
  };

  const createGame = (gameId: any) => {

  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>Create New Game</DialogTitle>
      <DialogContent>
        Creating a new {!!gameName ? `game of ${gameName}` : 'game'}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleClose()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant={'contained'}
          color={'primary'}
          disabled={isLoading}
          onClick={() => createGame(game?.id)}
        >
          Create Game
        </Button>
      </DialogActions>
    </Dialog>
  );
}


const mapStateToProps = (state: IState) => ({
  room: state.rooms.joinRoom.data,
  isLoading: state.rooms.joinRoom.isLoading,
  err: state.rooms.joinRoom.err,
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  joinRoom: (roomId: string, name: string, gameSettings: any) => dispatch(performCreateGame(roomId, name, gameSettings))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGameModal);