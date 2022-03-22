import * as React from 'react';
import { connect } from 'react-redux'

import IState from 'src/redux/states';
import { createGame as performCreateGame } from 'src/redux/actions';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from 'src/modules/common';
import { StyledNewGameSettingsLabel, StyledNewGameSettingsRow } from './index.style';
import { TextField, Select } from 'src/modules/common';
import { MenuItem } from '@material-ui/core';

interface IProps {
  roomId: string;
  roomName?: string;
  gameDetails?: any;
  game?: any;
  isLoading: boolean;
  err: string;
  open: boolean;
  onClose: () => void;
  onComplete: (game: any) => void;
  onError: (err: string) => void;
  createGame: (roomId: string,
    name: string,
    gameTypeId: string,
    chosenGameSettings: any) => void;
}

const CreateGameModal: React.FC<IProps> = (props: IProps) => {
  const {
    roomId,
    roomName,
    gameDetails,
    open,
    isLoading,
    err,
    game,
    onClose,
    onComplete,
    onError,
    createGame,
  } = props;

  const {
    name='',
    _id='',
    allGameSettings={},
  } = gameDetails || {};


  const [chosenGameSettings, setChosenGameSettings] = React.useState<any>(
    Object.keys(allGameSettings).reduce((o, k) => { o[k]=''; return o; }, {} as any)
  );

  // send complete if detected
  React.useEffect(() => {
    if (game && !isLoading && !err) {
      // clear and close the modal
      onComplete(game);
      setImmediate(() => {
        onClose();
      });
    }
  }, [game, isLoading, err]);

  // send error if detected
  React.useEffect(() => {
    if (err) {
      onError(err);
    }
  }, [err]);

  const handleClose = () => {
    // don't close if loading
    if (isLoading) {
      return;
    }

    onClose();
  };

  const handleCreateGame = () => {
    createGame(
      roomId,
      name,
      _id,
      chosenGameSettings,
    );
  };

  const handleChosenSettingsChange = (settingName: string) => (settingValue: string | number) => {
    const newChosenGameSettings = { 
      ...chosenGameSettings,
      [settingName]: settingValue,
    };

    setChosenGameSettings(newChosenGameSettings);
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>Creating a new {!!name ? `game of ${name}` : 'game'}</DialogTitle>
      <DialogContent>
        {/* Display settings in fillable form */}
        {
          Object.keys(allGameSettings).map(settingName => (
            <StyledNewGameSettingsRow
              key={settingName}
            >
              <StyledNewGameSettingsLabel>
                {allGameSettings[settingName].label}
              </StyledNewGameSettingsLabel>
              <SettingInput
                type={allGameSettings[settingName].type}
                value={chosenGameSettings[settingName]}
                options={allGameSettings[settingName].options}
                onChange={handleChosenSettingsChange(settingName)}
              />
            </StyledNewGameSettingsRow>
          ))
        }
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleClose()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant={'contained'}
          color={'primary'}
          disabled={isLoading}
          onClick={() => handleCreateGame()}
        >
          Create Game
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface ISettingInputProps {
  type: 'string' | 'number' | 'select';
  value: string | number;
  options?: Array<{ key: string, value: string }>
  onChange: (value: string | number) => void;
};

const SettingInput: React.FC<ISettingInputProps> = (props: ISettingInputProps) => {
  const { type, value, options=[], onChange } = props;

  if (type === 'string') {
    return (
      <TextField
        value={value as string}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }
  else if (type === 'number') {
    return (
      <TextField
        type={'number'}
        value={value as number}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }
  else if (type === 'select') {
    const selectValue: string = value ? value as string : options[0].value;
    return (
      <Select
        value={selectValue}
        onChange={(event) => onChange(event.target.value as string)}
      >
        {
          options.map(({key, value}) => (
            <MenuItem
              value={key}
              key={key}
            >
              {value}
            </MenuItem>
          ))
        }
      </Select>
    );
  }

  return (<div/>);
};

const mapStateToProps = (state: IState) => ({
  game: state.games.createGame.data,
  isLoading: state.games.createGame.isLoading,
  err: state.games.createGame.err,
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  createGame: (roomId: string,
    name: string,
    gameTypeId: string,
    chosenGameSettings: any) => dispatch(performCreateGame(roomId, name, gameTypeId, chosenGameSettings))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGameModal);