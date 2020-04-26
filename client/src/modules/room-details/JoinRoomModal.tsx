import * as React from 'react';
import { connect } from 'react-redux'

import IState from 'src/redux/states';
import { joinRoom as performJoinRoom } from 'src/redux/actions';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '../common';

interface IProps {
  roomId: string;
  roomName?: string;
  open: boolean;
  onClose: () => void;
  onComplete: (room: any) => void;
  onError: (err: string) => void;

  room: any;
  isLoading: boolean;
  err: string;
  joinRoom: (roomId: string) => void;
}

const JoinRoomModal: React.FC<IProps> = (props: IProps) => {
  const {
    roomId,
    roomName,
    open,
    onClose,
    onComplete,
    onError,

    room,
    isLoading,
    err,
    joinRoom,
  } = props;


  // send complete if detected
  React.useEffect(() => {
    if (!isLoading && !err) {
      // clear and close the modal
      onComplete(room);
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

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>Join Room</DialogTitle>
      <DialogContent>
        Are you sure you would like to join the room {roomName}? 
        By joining this room you will be removed from any other rooms.
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
          onClick={() => joinRoom(roomId)}
        >
          Join Room
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
  joinRoom: (roomId: string) => dispatch(performJoinRoom(roomId))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinRoomModal);