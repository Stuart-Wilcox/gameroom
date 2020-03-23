import * as React from 'react';
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom';

import IState from 'src/redux/states';
import { retrieveRoom } from 'src/redux/actions';

import { User } from '../../utils';

import {
  StyledRoomDetailsPage,
} from './index.style';
import {
  Button,
  ErrorSnackbar,
  Title,
} from '../common';
import RoomDetailsHeader from './RoomDetailsHeader';
import RoomDetailsBody from './RoomDetailsBody';
import JoinRoomModal from './JoinRoomModal';


interface IProps extends RouteComponentProps {
  room?: any;
  isLoading: boolean;
  err?: string;
  onRetrieveRoom: (id: string) => void;
}

const RoomDetails: React.FC<IProps> = (props: IProps) => {
  const {
    match,
    room,
    isLoading,
    err,
    onRetrieveRoom,    
  } = props;
  
  
  const [joinRoomModalOpen, setJoinRoomModalOpen] = React.useState<boolean>(false);
  const [joinRoom, setJoinRoom] = React.useState<any>({});
  const [displayError, setDisplayError] = React.useState<string>('');

  const currentUserIsJoined = React.useMemo(() => {
    if (room) {
      const user = User.get();
      return room.currentMembers.some((member: any) => member._id === user._id);
    }
    return false;
  }, [room]);
  
  // fetch room on mount
  React.useEffect(() => {
    const roomId = (match.params as any)?.id;
    onRetrieveRoom(roomId);
  }, []);

  React.useEffect(() => {
    if (err) {
      setDisplayError(err);
    }
  }, [err]);

  const handleJoinRoomComplete = (room: any) => {
  };

  const handleJoinRoomModalClose = () => {
    setJoinRoom({});
    setJoinRoomModalOpen(false);
  };

  console.log(room);
  
  // show the users in this room, games history, etc
  // stats, create new game (which navigates to games page)
  return (
    <StyledRoomDetailsPage>
      <RoomDetailsHeader
        name={room?.name}
        isPrivate={room?.isPrivate}
        invitedMembers={room?.invitedMembers}
        currentMembers={room?.currentMembers}
        currentUserIsJoined={currentUserIsJoined}
        onJoin={() => setJoinRoomModalOpen(true)}
        onLeave={() => null}
      />
      <RoomDetailsBody />
      
      <JoinRoomModal
        roomId={joinRoom._id}
        roomName={joinRoom.name}
        open={joinRoomModalOpen}
        onClose={() => handleJoinRoomModalClose()}
        onComplete={(room) => handleJoinRoomComplete(room)}
        onError={(err: string) => setDisplayError(err)}
      />
      <ErrorSnackbar
        message={displayError}
      />
    </StyledRoomDetailsPage>
  );
}

const WithRouterRoomDetails = withRouter(RoomDetails);

const mapStateToProps = (state: IState) => ({
  room: state.rooms.room.data,
  isLoading: state.rooms.room.isLoading,
  err: state.rooms.room.err,
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  onRetrieveRoom: (id: string) => dispatch(retrieveRoom(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithRouterRoomDetails);
