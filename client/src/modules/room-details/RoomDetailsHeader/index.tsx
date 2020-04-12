import * as React from 'react';

import {
  Lock,
  LockOpen,
} from '@material-ui/icons';
import {
  Tooltip
} from '@material-ui/core';
import {
  StyledRoomDetailsHeader,
  StyledRoomDetailsTopBar,
  StyledRoomDetailsBottomBar,
} from './index.style';
import {
  Button,
  Title,
} from '../../common';
import UsersDisplay from './UsersDisplay';
import { SimpleUser } from 'src/redux/states/user';

interface IProps {
  name?: string;
  isActive?: boolean;
  invitedMembers?: SimpleUser[];
  currentMembers?: SimpleUser[];
  currentUserIsJoined?: boolean;
  onJoin: () => void;
  onLeave: () => void;
}

const RoomDetailsHeader: React.FC<IProps> = (props: IProps) => {
  const {
    name,
    isActive,
    invitedMembers,
    currentMembers,
    currentUserIsJoined,
    onJoin,
    onLeave,
  } = props;

  const joinOrLeaveButtonLabel = currentUserIsJoined ? 'Leave' : 'Join';

  const handleJoinOrLeave = () => {
    if (currentUserIsJoined) {
      onLeave();
    }
    else {
      onJoin();
    }
  };
  
  return (
    <StyledRoomDetailsHeader>
      <StyledRoomDetailsTopBar>
        <div>
          <Title>
            { name }
          </Title>
          <Tooltip title={`This room is ${ isActive ? 'active' : 'not active' }`}>
            {
              isActive ?
              (
                <LockOpen fontSize={'small'}/>
              )
              :
              (
                <Lock fontSize={'small'} />
              )
            }
          </Tooltip>
        </div>
        <Button onClick={() => handleJoinOrLeave()}>
          { joinOrLeaveButtonLabel }
        </Button>
      </StyledRoomDetailsTopBar>
      <StyledRoomDetailsBottomBar>
        <UsersDisplay 
          isActive={isActive}
          invitedMembers={invitedMembers}
          currentMembers={currentMembers}
        />
      </StyledRoomDetailsBottomBar>
    </StyledRoomDetailsHeader>
  );
}

export default RoomDetailsHeader;
