import * as React from 'react';

import {
  StyledRoomDetailsBody,
} from './index.style';
import {
  Paper,
  Title,
} from '../../common';
import {
  Tabs,
  Tab,
} from '@material-ui/core';

interface IProps {
  isActive?: boolean;
}

const RoomDetailsBody: React.FC<IProps> = (props: IProps) => {
  const {
    isActive,
  } = props;

  const [tab, setTab] = React.useState<number>(0);

  if (!isActive) {
    return (
      <StyledRoomDetailsBody>
        This room is currently inactive. To make it active, at least one user must join it.
      </StyledRoomDetailsBody>
    );
  }
  
  return (
    <StyledRoomDetailsBody>
      <Paper>
        <Tabs
          centered={true}
          value={tab}
          onChange={(event, tab: number) => setTab(tab)}        
        >
          <Tab label={'New Game'} />
          <Tab label={'Leaderboards'} />
        </Tabs>
      </Paper>
    </StyledRoomDetailsBody>
  );
}

export default RoomDetailsBody;
