import * as React from 'react';
import * as Redux from 'react-redux';
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom';

import IState from 'src/redux/states';
import {
  DetailedRoom, SimpleRoom,
} from 'src/redux/states/rooms';
import {
  SimpleUser,
} from 'src/redux/states/user';
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
import LeaveRoomModal from './LeaveRoomModal';


interface IProps extends RouteComponentProps {
  room?: DetailedRoom;
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
  const roomId = (match.params as any)?.id;
  
  const [joinRoomModalOpen, setJoinRoomModalOpen] = React.useState<boolean>(false);
  const [leaveRoomModalOpen, setLeaveRoomModalOpen] = React.useState<boolean>(false);
  const [displayError, setDisplayError] = React.useState<string>('');

  const user = Redux.useSelector((state: IState) => {
    return state.user.currentUser.data;
  });

  const currentUserIsJoined = React.useMemo(() => {
    if (room) {
      return room.currentMembers.some((member: any) => member._id === user?._id);
    }
    return false;
  }, [room, user]);
  
  // fetch room on mount
  React.useEffect(() => {
    onRetrieveRoom(roomId);
  }, [roomId]);

  React.useEffect(() => {
    if (err) {
      setDisplayError(err);
    }
  }, [err]);

  const handleJoinRoomComplete = (room: SimpleRoom) => {
  };

  const handleLeaveRoomComplete = (room: SimpleRoom) => {
  };

  const handleJoinRoomModalClose = () => {
    setJoinRoomModalOpen(false);
  };

  const handleLeaveRoomModalClose = () => {
    setLeaveRoomModalOpen(false);
  };
  
  // show the users in this room, games history, etc
  // stats, create new game (which navigates to games page)
  return (
    <StyledRoomDetailsPage>
      <RoomDetailsHeader
        name={room?.name}
        invitedMembers={room?.invitedMembers}
        currentMembers={room?.currentMembers}
        currentUserIsJoined={currentUserIsJoined}
        isActive={room?.isActive}
        onJoin={() => setJoinRoomModalOpen(true)}
        onLeave={() => setLeaveRoomModalOpen(true)}
      />
      <RoomDetailsBody
        isActive={room?.isActive}
        roomId={room?._id}
        invitedMembers={(room?.invitedMembers || []).map(user => user._id)}
      />
      
      <JoinRoomModal
        roomId={room?._id || ''}
        roomName={room?.name}
        open={joinRoomModalOpen}
        onClose={() => handleJoinRoomModalClose()}
        onComplete={(room: SimpleRoom) => handleJoinRoomComplete(room)}
        onError={(err: string) => setDisplayError(err)}
      />
      <LeaveRoomModal
        roomId={room?._id || ''}
        roomName={room?.name}
        open={leaveRoomModalOpen}
        onClose={() => handleLeaveRoomModalClose()}
        onComplete={(room: SimpleRoom) => handleLeaveRoomComplete(room)}
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
  room: state.rooms.retrieveRoom.data,
  isLoading: state.rooms.retrieveRoom.isLoading,
  err: state.rooms.retrieveRoom.err,
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  onRetrieveRoom: (id: string) => dispatch(retrieveRoom(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithRouterRoomDetails);
