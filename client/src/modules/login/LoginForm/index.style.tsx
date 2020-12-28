import styled from 'styled-components';

export const StyledLoginForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  border: solid 1px rgba(0, 0, 0, 0.4);
  border-radius: 4px;

  & > div, & > button {
    margin: 8px 16px;
  }
`;