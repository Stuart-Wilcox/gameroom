import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Zoom } from '@material-ui/core';
import LoginForm from './LoginForm';

import {
  StyledLoginPage,
} from './index.style';
import MFAForm from './MFAForm';

interface IProps extends RouteComponentProps {
}

const LoginPage: React.FC<IProps> = (props: IProps) => {
  const {
    history,
  } = props;

  const [page, setPage] = React.useState<'login' | 'mfa'>('login');

  const handleComplete = () => {
    history.push('/rooms');
  };
  
  return (
    <StyledLoginPage>
      <h1>Sign In</h1>
      {
        page === 'login' ?
        (
          <Zoom in={page === 'login'}>
            <LoginForm
              onComplete={() => setPage('mfa')}
              onError={err => null}
            />
          </Zoom>
        )
        :
        (
          <Zoom in={page === 'mfa'}>
            <MFAForm
              onAbandon={() => setPage('login')}
              onComplete={() => handleComplete()}
              onError={err => null}
            />
          </Zoom>
        )
      }
    </StyledLoginPage>
  );
}

export default withRouter(LoginPage);
