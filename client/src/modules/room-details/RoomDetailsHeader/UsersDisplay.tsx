import * as React from 'react';

import {
  StyledUsersDisplay,
} from './index.style';
import {
  Avatar,
  AvatarGroup,
} from 'src/modules/common'
import { SimpleUser } from 'src/redux/states/user';
import { formatName } from 'src/utils';


interface IProps {
  isActive?: boolean;
  invitedMembers?: SimpleUser[];
  currentMembers?: SimpleUser[];  
}

const UsersDisplay: React.FC<IProps> = (props: IProps) => {
  const {
    isActive,
    invitedMembers,
    currentMembers,
  } = props;

  // inactive members
  const currentMemberIds = new Set(currentMembers?.map(user => user._id))
  const inactiveMembers = invitedMembers?.filter(user => !currentMemberIds.has(user._id));

  if (isActive) {
    return (
      <StyledUsersDisplay>
        <AvatarGroup spacing={'medium'}>
          {
            currentMembers?.map(member => (
                <Avatar key={member._id}>
                  {/* TODO put in user picture */}
                  <div title={member.username}>
                    {formatName(member.username)}
                  </div>
                </Avatar>
            ))
          }
          {
            inactiveMembers?.map(member => {
              <Avatar key={member._id}>
                {'INACTIVE ' + member.username}
              </Avatar>
            })
          }
        </AvatarGroup>
      </StyledUsersDisplay>
    );
  }

  return <></>;
};

export default UsersDisplay;