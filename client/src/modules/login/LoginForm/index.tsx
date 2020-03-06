import * as React from 'react';
import { connect } from 'react-redux'
import { validateEmail } from 'src/utils';
import { login } from 'src/redux/actions';
import IState from 'src/redux/states';

import { TextField, Button } from 'src/modules/common';
import {
  StyledLoginForm,
} from './index.style';
import {
  StyledErrorText,
} from '../index.style';

interface IProps {
  err: string;
  message: string;
  onComplete: () => void;
  onError: (err: string) => void;
  onLogin: (username: string, email: string) => void;
}

const LoginForm: React.FC<IProps> = (props: IProps) => {
  const {
    err,
    message,
    onComplete,
    onError,
    onLogin,
  } = props;

  const [username, setUsername] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');

  const [usernameError, setUsernameError] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string>('');
  const [loginError, setLoginError] = React.useState<string>('');

  // clear error when input is changed
  React.useEffect(() => setUsernameError(''), [username]);
  React.useEffect(() => setEmailError(''), [email]);

  // show login error when err changes, clear error when input changes
  React.useEffect(() => setLoginError(err || ''), [err]);
  React.useEffect(() => setLoginError(''), [username, email]);

  // notify complete when message comes through
  React.useEffect(() => {
    if (message) {
      onComplete();
    }
  }, [message]);

  // notify error when err comes through
  React.useEffect(() => {
    if (err) {
      onError(err);
    }
  }, [err]);
  
  const handleLogin = () => {
    if (!username) {
      setUsernameError('Required');
      return;
    }
    if (!email) {
      setEmailError('Required');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Invalid email');
      return;
    }

    onLogin(username, email);
  };

  return (
    <StyledLoginForm>
      <TextField
        autoFocus={true}
        label={'Username'}
        placeholder={'Pick a username'}
        error={!!usernameError}
        helperText={usernameError}
        name={'Username'}
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <TextField
        label={'Email'}
        placeholder={'Enter email to use for MFA'}
        error={!!emailError}
        helperText={emailError}
        name={'Email'}
        value={email}
        onChange={event => setEmail(event.target.value)}
        onKeyPress={event => event.key === 'Enter' ? handleLogin() : null}
      />
      <StyledErrorText>
        {loginError}
      </StyledErrorText>
      <Button
        variant={'contained'}
        color={'primary'}
        onClick={() => handleLogin()}
      >
        Sign In
      </Button>
    </StyledLoginForm>
  );
}


const mapStateToProps = (state: IState) => ({
  err: state.login.err,
  message: state.login.message,
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  onLogin: (username: string, email: string) => dispatch(login(username, email)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);