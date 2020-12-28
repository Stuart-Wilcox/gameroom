import styled from 'styled-components';

export const StyledRoomDetailsHeader = styled.div`

`;

export const StyledRoomDetailsTopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > div {
    flex: 1;
    display: flex;
    align-items: center;

    & > h2 {
      margin-right: 8px;
    }
  }
`;

export const StyledRoomDetailsBottomBar = styled.div`
  display: flex;
`;

export const StyledUsersDisplay = styled.div`
  display: flex;
  padding: 4px;
`;