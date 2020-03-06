import * as React from 'react';
import { connect } from 'react-redux'
// import { AutoSizer, Column, Table, TableCellRenderer, TableHeaderProps } from 'react-virtualized';

import IState from 'src/redux/states';
import { listRooms } from 'src/redux/actions';

import { 
  StyledRoomsPage,
  StyledHeader,
  StyledBody,
} from './index.style';
import { 
  Button,
  ErrorSnackbar,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Title,
} from '../common';
import EmptyDisplay from './EmptyDisplay';
import CreateRoomModal from './CreateRoomModal';

interface IProps {
  rooms?: any;
  isLoading: boolean;
  err?: string;
  onListRooms: () => void;
}

const RoomsPage: React.FC<IProps> = (props: IProps) => {
  const {
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

  const columns = [
    {
      id: 0,
      label: 'Name',
    },
    {
      id: 1,
      label: 'Creator',
    },
    {
      id: 2,
      label: 'Created',
    },
  ];
  
  return (
    <StyledRoomsPage>
      <StyledHeader>
        <Title>
          Available Rooms
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
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                {
                  columns.map(column => (
                    <TableCell key={column.id}>
                      {column.label}
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                rooms.map((room: any) => (
                  <TableRow key={room.id}>
                    <TableCell>{room.name}</TableCell>
                    <TableCell>{room.creator.username}</TableCell>
                    <TableCell>{room.created}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
          {
            rooms.length === 0 && <EmptyDisplay onCreateRoom={() => setCreateModalOpen(true)}/>
          }
        </Paper>
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
)(RoomsPage);