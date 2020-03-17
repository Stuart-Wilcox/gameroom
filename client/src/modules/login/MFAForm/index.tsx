import * as React from 'react';
import { connect } from 'react-redux'
import { mfa } from 'src/redux/actions';
import IState from 'src/redux/states';


import { TextField, Button, Link } from 'src/modules/common';
import {
  StyledMFAForm,
  StyledActionContainer,
} from './index.style';
import {
  StyledErrorText,
} from '../index.style';


interface IProps {
  username: string,
  message: string,
  err: string,
  onComplete: () => void;
  onError: (err: string) => void;
  onSubmit: (username: string, MFAToken: string) => void;
  onAbandon: () => void;
}

const MFAForm: React.FC<IProps> = (props: IProps) => {
  const {
    username, 
    message,
    err,
    onComplete,
    onError,
    onSubmit,
    onAbandon,
  } = props;

  const [MFAToken, setMFAToken] = React.useState<string>('');
  const [MFATokenError, setMFATokenError] = React.useState<string>('');
  const [MFAError, setMFAError] = React.useState<string>('');

  // clear error when input changes
  React.useEffect(() => setMFATokenError(''), [MFAToken]);

  // show mfa error when err changes, clear error when input changes
  React.useEffect(() => setMFAError(err || ''), [err]);
  React.useEffect(() => setMFAError(''), [MFAToken]);

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

  const handleSubmit = () => {
    if (!MFAToken) {
      setMFATokenError('Required');
    }

    onSubmit(username, MFAToken);
  };
  
  return (
    <StyledMFAForm>
      <TextField
        autoFocus={true}
        label={'MFA Token'}
        placeholder={'Enter MFA Token'}
        error={!!MFATokenError}
        helperText={MFATokenError}
        name={'MFA Token'}
        value={MFAToken}
        onChange={event => setMFAToken(event.target.value)}
        onKeyPress={event => event.key === 'Enter' ? handleSubmit() : null}
      />
      <StyledErrorText>
        {MFAError}
      </StyledErrorText>
      <Button
        variant={'contained'}
        color={'primary'}
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
      <StyledActionContainer>
        <Link
          href='#'
          onClick={() => onAbandon()}
        >
          Go back
        </Link>
        <Link
          href='#'
          onClick={() => console.warn('Not implemented')}
        >
          Request new MFA
        </Link>
      </StyledActionContainer>
    </StyledMFAForm>
  );
}


const mapStateToProps = (state: IState) => ({
  username: state.login.username,
  message: state.mfa.message,
  err: state.mfa.err,
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  onSubmit: (username: string, MFAToken: string) => dispatch(mfa(username, MFAToken)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MFAForm);