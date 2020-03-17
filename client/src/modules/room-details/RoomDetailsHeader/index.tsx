import * as React from 'react';

import {
  StyledRoomDetailsHeader,
} from './index.style';
import {
  Button,
  Title,
} from '../../common';

interface IProps {
  name: string;
  currentUserIsJoined: boolean;
}

const RoomDetailsHeader: React.FC<IProps> = (props: IProps) => {
  const {
    name,
    currentUserIsJoined,
  } = props;

  const joinOrLeaveButtonLabel = currentUserIsJoined ? 'Leave' : 'Join';
  
  return (
    <StyledRoomDetailsHeader>
      <Title>
        { name }
      </Title>
      <Button>
        { joinOrLeaveButtonLabel }
      </Button>
    </StyledRoomDetailsHeader>
  );
}

export default RoomDetailsHeader;
