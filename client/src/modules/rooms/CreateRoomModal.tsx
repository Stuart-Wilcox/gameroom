import * as React from 'react';
import { connect } from 'react-redux'

import IState from 'src/redux/states';
import { createRoom as performCreateRoom } from 'src/redux/actions';

import { FormControlLabel } from '@material-ui/core';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '../common';

interface IProps {
  open: boolean;
  onClose: () => void;
  onComplete: (room: any) => void;
  onError: (err: string) => void;

  room: any;
  isLoading: boolean;
  err: string;
  createRoom: (name: string) => void;
}

const CreateRoomModal: React.FC<IProps> = (props: IProps) => {
  const {
    open,
    onClose,
    onComplete,
    onError,

    room,
    isLoading,
    err,
    createRoom,
  } = props;

  const [name, setName] = React.useState<string>('');

  const clear = () => {
    setName('');
  };

  const validate = () => {
    return !!name;
  };

  // send complete if detected
  React.useEffect(() => {
    if (!isLoading && !err) {
      // clear and close the modal
      setImmediate(() => {
        clear();
        onClose();
      });
      onComplete(room);
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
    
    clear();
    onClose();
  };
  
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>Create Room</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth={true}
          label={'Room Name'}
          placeholder={'Enter a name for the room'}
          value={name}
          autoFocus={true}
          onChange={event => setName(event.target.value)}
          onKeyPress={event => event.key === 'Enter' && validate() ? createRoom(name) : null}
        />
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
          disabled={!validate() || isLoading}
          onClick={() => createRoom(name)}
        >
          Create Room
        </Button>
      </DialogActions>
    </Dialog>
  );
}


const mapStateToProps = (state: IState) => ({
  room: state.rooms.createRoom.data,
  isLoading: state.rooms.createRoom.isLoading,
  err: state.rooms.createRoom.err,
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  createRoom: (name: string) => dispatch(performCreateRoom(name))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoomModal);