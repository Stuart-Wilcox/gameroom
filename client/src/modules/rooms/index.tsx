import * as React from 'react';
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom';
// import { AutoSizer, Column, Table, TableCellRenderer, TableHeaderProps } from 'react-virtualized';

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
  rooms?: any;
  isLoading: boolean;
  err?: string;
  onListRooms: () => void;
}

const RoomsPage: React.FC<IProps> = (props: IProps) => {
  const {
    history,
    rooms=[],
    isLoading,
    err='',
    onListRooms,
  } = props;

  // fetch rooms on mount
  React.useEffect(() => {
    onListRooms();
  }, []);

  const [createModalOpen, setCreateModalOpen] = React.useState<boolean>(false);
  const [displayError, setDisplayError] = React.useState<string>('');

  React.useEffect(() => {
    if (err) {
      setDisplayError(err);
    }
  }, [err]);

  const handleSelectRoom = (roomId: string) => {
    history.push(`/rooms/${roomId}`);
  };

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
        {/* 
        <StyledTableContainer>
          <h4>My Rooms</h4>
          <RoomsTable
            rooms={rooms.filter((room: any) => room.creator === '1')}
            onCreateRoom={() => setCreateModalOpen(true)}
          />
        </StyledTableContainer> 
        */}
        <StyledTableContainer>
          <h4>All Rooms</h4>
          <RoomsTable
            rooms={rooms}
            onCreateRoom={() => setCreateModalOpen(true)}
            onSelectRoom={(roomId: string) => handleSelectRoom(roomId)}
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

const mapStateToProps = (state: IState) => ({
  rooms: state.rooms.rooms.data,
  isLoading: state.rooms.rooms.isLoading,
  err: state.rooms.rooms.err,
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  onListRooms: () => dispatch(listRooms()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithRouterRoomsPage);