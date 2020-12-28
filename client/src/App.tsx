import * as React from 'react';
import styled from 'styled-components';
import Routes from './routes';

const StyledApp = styled.div`
  background-color: #EEEEEE;
  color: #000000;
  height: 100%;
  min-height: 100vh;
  padding-bottom: 32px;
`;

interface IProps {
  
}

const App: React.FC<IProps> = (props: IProps) => {
  const {
    
  } = props;
  
  return (
    <StyledApp>
      <Routes />
    </StyledApp>
  );
}

export default App;
