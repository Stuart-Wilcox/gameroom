import * as React from 'react';
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom';

import IState from 'src/redux/states';
import { retrieveRoom } from 'src/redux/actions';

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
  
  // fetch room on mount
  React.useEffect(() => {
    const roomId = (match.params as any)?.id;
    onRetrieveRoom(roomId);
  }, []);
  
  // show the users in this room, games history, etc
  // stats, create new game (which navigates to games page)
  return (
    <StyledRoomDetailsPage>
      <RoomDetailsHeader
        name={room?.name}
      />
      <RoomDetailsBody />
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
