import styled from 'styled-components';

export const StyledRoomDetailsBody = styled.div`
  display: block;
`;

export const StyledInvitePlayers = styled.div`
  padding: 24px;
`;

export const StyledLeaderboards = styled.div`
  padding: 24px;
`;

export const StyledNewGame = styled.div`
  padding: 24px;
`;

export const StyledInviteLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
  margin-bottom: 16px;
`;

export const StyledInviteLink = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  margin-right: 4px;
`;

export const StyledEmptyInviteUsers = styled.div`
  font-size: 14px;
  padding-top: 30px;
  padding-bottom: 30px;
  flex: 1;
  display: flex;
  justify-content: center;
  text-align: center;

  & > div {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.6);
    & > div {
      margin-bottom: 16px;
    }
  }
`;

export const StyledNewGameSettingsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const StyledNewGameSettingsLabel = styled.div`
  
`;