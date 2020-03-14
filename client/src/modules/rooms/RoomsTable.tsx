import * as React from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '../common';
import EmptyDisplay from './EmptyDisplay';


interface IProps {
  rooms: any;
  onCreateRoom: () => void;
  onSelectRoom: (room: any) => void;
}

const RoomsTable: React.FC<IProps> = (props: IProps) => {
  const {
    rooms,
    onCreateRoom,
    onSelectRoom,
  } = props;

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
              <TableRow
                key={room._id}
                style={{ cursor: 'pointer' }}
                hover={true}
                onClick={() => onSelectRoom(room)}
              >
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.creator.username}</TableCell>
                <TableCell>{room.created}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      {
        rooms.length === 0 && <EmptyDisplay onCreateRoom={() => onCreateRoom()} />
      }
    </Paper>
  );
}

export default RoomsTable;
