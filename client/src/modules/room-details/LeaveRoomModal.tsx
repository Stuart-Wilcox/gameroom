import * as React from 'react';
import { connect } from 'react-redux'

import IState from 'src/redux/states';
import { leaveRoom as performLeaveRoom } from 'src/redux/actions';

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
  leaveRoom: (roomId: string) => void;
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
    leaveRoom,
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
        Are you sure you would like to leave the room {roomName}? 
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
          onClick={() => leaveRoom(roomId)}
        >
          Leave Room
        </Button>
      </DialogActions>
    </Dialog>
  );
}


const mapStateToProps = (state: IState) => ({
  room: state.rooms.leaveRoom.data,
  isLoading: state.rooms.leaveRoom.isLoading,
  err: state.rooms.leaveRoom.err,
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  leaveRoom: (roomId: string) => dispatch(performLeaveRoom(roomId))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinRoomModal);