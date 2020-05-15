import * as React from 'react';
import {
    Search,
} from '@material-ui/icons';
import {
    InputAdornment,
} from '@material-ui/core';
import {
    TextField,
} from '../../common';
import {
    StyledInvitePlayers,
} from './index.style';

interface IProps {

}

const InviteUsers: React.FC<IProps> = (props: IProps) => {
    const [searchValue, setSearchValue] = React.useState<string>('');

    return (
        <StyledInvitePlayers>
            <TextField 
                placeholder={'Type a username...'}
                label={'Search for Users'}
                value={searchValue}
                onChange={event => setSearchValue(event.currentTarget.value)}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                }}
            />
        </StyledInvitePlayers>
    );
};

export default InviteUsers;