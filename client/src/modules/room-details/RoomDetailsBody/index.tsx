import * as React from 'react';

import {
  StyledRoomDetailsBody,
} from './index.style';
import {
  Paper,
  Title,
  TabPanel,
} from '../../common';
import {
  Tabs,
  Tab,
} from '@material-ui/core';
import NewGame from './NewGame';
import Leaderboards from './Leaderboards';
import InvitePlayers from './InvitePlayers';

interface IProps {
  isActive?: boolean;
  roomId?: string;
  roomName?: string;
  invitedMembers: string[];
}

const RoomDetailsBody: React.FC<IProps> = (props: IProps) => {
  const {
    isActive,
    roomId='',
    roomName='',
    invitedMembers,
  } = props;

  const [tab, setTab] = React.useState<number>(2);

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
          <Tab label={'Invite Players'} />
        </Tabs>
        <TabPanel
          value={tab}
          index={0}
        > 
          <NewGame 
            roomId={roomId}
            roomName={roomName}
          />
        </TabPanel>
        <TabPanel
          value={tab}
          index={1}
        > 
          <Leaderboards />
        </TabPanel>
        <TabPanel
          value={tab}
          index={2}
        > 
          <InvitePlayers
            roomId={roomId}
            invitedMembers={invitedMembers}
          />
        </TabPanel>
      </Paper>
    </StyledRoomDetailsBody>
  );
}

export default RoomDetailsBody;