import * as React from 'react';
import * as Redux from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom';

import IState from 'src/redux/states';
import { listRooms } from 'src/redux/actions';

import { 
  StyledRoomsPage,
  StyledHeader,
  StyledBody,
  StyledTableContainer,
} from './index.style';
import { 
  Button,
  ErrorSnackbar,
  Title,
} from '../common';
import CreateRoomModal from './CreateRoomModal';
import RoomsTable from './RoomsTable';

interface IProps extends RouteComponentProps {
}

const RoomsPage: React.FC<IProps> = (props: IProps) => {
  const {
    history,
  } = props;

  const dispatch = Redux.useDispatch();

  const {
    isLoading,
    data: rooms=[],
    err='',
  } = Redux.useSelector((state: IState) => {
    return state.rooms.listRooms;
  });

  const {
    data:currentUser
  } = Redux.useSelector((state: IState) => {
    return state.user.currentUser;
  });

  // fetch rooms on mount
  React.useEffect(() => {
    dispatch(listRooms());
  }, []);

  const [createModalOpen, setCreateModalOpen] = React.useState<boolean>(false);
  const [displayError, setDisplayError] = React.useState<string>('');

  React.useEffect(() => {
    if (err) {
      setDisplayError(err);
    }
  }, [err]);

  const handleSelectRoom = (room: any) => {
    history.push(`/rooms/${room._id}`);
  };

  const myRooms = rooms.filter((room: any) => room.creator._id === currentUser?._id);
  const invitedRooms = rooms.filter((room: any) => room.creator._id !== currentUser?._id);
  
  return (
    <StyledRoomsPage>
      <StyledHeader>
        <Title>
          Rooms
        </Title>
        <Button
          variant={'contained'}
          color={'primary'}
          onClick={() => setCreateModalOpen(true)}
        >
          Create Room
        </Button>
      </StyledHeader>
      <StyledBody>
        
        <StyledTableContainer>
          <h4>My Rooms</h4>
          <RoomsTable
            rooms={myRooms}
            onCreateRoom={() => setCreateModalOpen(true)}
            onSelectRoom={(room: any) => handleSelectRoom(room)}
          />
        </StyledTableContainer> 
       
        <StyledTableContainer>
          <h4>Invited Rooms</h4>
          <RoomsTable
            rooms={invitedRooms}
            onCreateRoom={() => setCreateModalOpen(true)}
            onSelectRoom={(room: any) => handleSelectRoom(room)}
          />
        </StyledTableContainer>
      </StyledBody>

      <CreateRoomModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onComplete={() => null}
        onError={(err: string) => setDisplayError(err)}
      />
      <ErrorSnackbar
        message={displayError}
      />
    </StyledRoomsPage>
  );
}


const WithRouterRoomsPage = withRouter(RoomsPage);
export default WithRouterRoomsPage;