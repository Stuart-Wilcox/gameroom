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
  
}

const RoomDetailsBody: React.FC<IProps> = (props: IProps) => {
  const {
    
  } = props;

  const [tab, setTab] = React.useState<number>(0);
  
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
