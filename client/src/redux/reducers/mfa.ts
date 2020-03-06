import { IMFAState } from '../states'; 
import { MFAActions } from '../actions';

const initialState: IMFAState = {
  err: '',
  message: '',
}

export default function (state = initialState, action: any): IMFAState {
  switch (action.type) {
    case MFAActions.SUBMIT_MFA:
      return submitMFA(state, action.payload);
    case MFAActions.SUBMIT_MFA_SUCCESS:
      return submitMFASuccess(state, action.payload);
    case MFAActions.SUBMIT_MFA_FAILED:
      return submitMFAFailed(state, action.payload);
    default:
      return state;
  }
};

const submitMFA = (state: IMFAState, payload: any): IMFAState => {
  return {
    ...state
  };
};

const submitMFASuccess = (state: IMFAState, payload: any): IMFAState => {
  const message = payload;
  return {
    ...state,
    message,
  };
};

const submitMFAFailed = (state: IMFAState, payload: any): IMFAState => {
  const err = payload;
  return {
    ...state,
    err,
  };
};