import * as React from 'react';

import {
  StyledRoomDetailsHeader,
} from './index.style';
import {
  Title,
} from '../../common';

interface IProps {
  name: string;
}

const RoomDetailsHeader: React.FC<IProps> = (props: IProps) => {
  const {
    name,
  } = props;
  
  return (
    <StyledRoomDetailsHeader>
      <Title>
        { name }
      </Title>
    </StyledRoomDetailsHeader>
  );
}

export default RoomDetailsHeader;
