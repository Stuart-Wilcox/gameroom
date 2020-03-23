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

interface IProps {
  name: string;
  isPrivate: boolean;
  invitedMembers: any[];
  currentMembers: any[];
  currentUserIsJoined: boolean;
  onJoin: () => void;
  onLeave: () => void;
}

const RoomDetailsHeader: React.FC<IProps> = (props: IProps) => {
  const {
    name,
    isPrivate,
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
          <Tooltip title={`This room is ${ isPrivate ? 'private' : 'public' }`}>
            {
              isPrivate ?
              (
                <Lock fontSize={'small'}/>
              )
              :
              (
                <LockOpen fontSize={'small'} />
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
          isPrivate={isPrivate}
          invitedMembers={invitedMembers}
          currentMembers={currentMembers}
        />
      </StyledRoomDetailsBottomBar>
    </StyledRoomDetailsHeader>
  );
}

export default RoomDetailsHeader;
