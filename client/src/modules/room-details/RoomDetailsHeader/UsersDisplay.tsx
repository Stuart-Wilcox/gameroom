import * as React from 'react';

import {
  StyledUsersDisplay,
} from './index.style';
import {
  Avatar,
  AvatarGroup,
} from 'src/modules/common'


interface IProps {
  isPrivate: boolean;
  invitedMembers: any[];
  currentMembers: any[];  
}

const UsersDisplay: React.FC<IProps> = (props: IProps) => {
  const {
    isPrivate,
    invitedMembers,
    currentMembers,
  } = props;

  if (isPrivate) {
    return (
      <StyledUsersDisplay>
        <PrivateUsersDisplay 
          invitedMembers={invitedMembers}
          currentMembers={currentMembers}
        />
      </StyledUsersDisplay>
    );
  }

  return (
    <StyledUsersDisplay>
      <PublicUsersDisplay
        currentMembers={currentMembers}
      />
    </StyledUsersDisplay>
  );
};

export default UsersDisplay;


interface IPrivateProps {
  invitedMembers: any[];
  currentMembers: any[];
};
const PrivateUsersDisplay: React.FC<IPrivateProps> = (props: IPrivateProps) => {
  const {
    invitedMembers,
    currentMembers,
  } = props;
  
  return (
    <StyledUsersDisplay>
      Content
    </StyledUsersDisplay>
  );
};


interface IPublicProps {
  currentMembers: any[];
};
const PublicUsersDisplay: React.FC<IPublicProps> = (props: IPublicProps) => {
  const {
    currentMembers,
  } = props;
  
  console.log(currentMembers);
  return (
    <StyledUsersDisplay>
      <AvatarGroup spacing={'medium'}>
        {
          currentMembers?.map(member => (
            <Avatar key={member._id}>
              {/* TODO put in user picture */}
              {member.username} 
            </Avatar>
          ))
        }
      </AvatarGroup>
    </StyledUsersDisplay>
  );
};
