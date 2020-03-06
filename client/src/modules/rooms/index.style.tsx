import styled from "styled-components";

export const StyledRoomsPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  max-width: 800px;
  margin: auto;
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > h2 {
    flex: 1;
  }
`;

export const StyledBody = styled.div`
  display: block;
`;

export const StyledEmptyDisplay = styled.div`
  font-size: 14px;
  padding-top: 30px;
  padding-bottom: 30px;
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