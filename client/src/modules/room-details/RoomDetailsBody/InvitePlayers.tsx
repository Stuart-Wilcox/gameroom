import * as React from 'react';
import {
    useDispatch,
    connect,
} from 'react-redux';
import {
    Search,
} from '@material-ui/icons';
import {
    InputAdornment,
} from '@material-ui/core';
import { searchUsersThunk } from '../../../redux/actions/user';
import { inviteMemberToRoomThunk, uninviteMemberFromRoomThunk } from '../../../redux/actions/rooms';
import IState, { IAsyncData } from '../../../redux/states';
import { SimpleUser } from '../../../redux/states/user';
import {
    debounce,
    copyToClipboard,
    getJoinRoomLink,
} from '../../../utils'
import {
    Button,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TextField,
} from '../../common';
import {
    StyledInvitePlayers,
    StyledInviteLinkContainer,
    StyledInviteLink,
    StyledEmptyInviteUsers,
} from './index.style';

const handlePerformSearch = (searchValue: string, dispatch: React.Dispatch<any>) => {
    if (!searchValue) {
        return;
    }

    dispatch(searchUsersThunk(searchValue));
};

const debouncedHandlePerformSearch = debounce(handlePerformSearch, 1000);

interface IProps {
    roomId: string;
    invitedMembers: string[];
    users: IAsyncData<SimpleUser[]>,
}

const InviteUsers: React.FC<IProps> = (props: IProps) => {
    const {
        roomId,
        invitedMembers,
        users,
    } = props;

    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = React.useState<string>('');
    const inviteLink = getJoinRoomLink(roomId);
    const invitedMemberMap = React.useMemo(() => {
        return invitedMembers.reduce((acc, curr) => {
            acc[curr] = true;
            return acc;
        }, {} as any)
    }, [invitedMembers]);

    const handleCopyInviteLink = () => {
        copyToClipboard(inviteLink);
    };

    const handleUserSearchValueChange = (username: string) => {
        setSearchValue(username);
        debouncedHandlePerformSearch(username, dispatch);
    };

    const handleInviteUser = (userId: string) => {
        dispatch(inviteMemberToRoomThunk(roomId, [userId]));
    };

    const handleUninviteUser = (userId: string) => {
        dispatch(uninviteMemberFromRoomThunk(roomId, [userId]));
    };

    return (
        <StyledInvitePlayers>
            <StyledInviteLinkContainer>
                <StyledInviteLink>
                    {inviteLink}
                </StyledInviteLink>
                <Button
                    onClick={handleCopyInviteLink}
                >
                    Copy
                </Button>
            </StyledInviteLinkContainer>
            <TextField 
                placeholder={'Type a username...'}
                label={'Search for Users'}
                value={searchValue}
                onChange={event => handleUserSearchValueChange(event.currentTarget.value)}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                }}
            />
            <Paper style={{ marginTop: 16 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Name
                            </TableCell>
                            <TableCell>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !!users.data ?
                            (users.data || []).map(user => (
                                <TableRow
                                    key={user._id}
                                >
                                    <TableCell>
                                        {user.username}
                                    </TableCell>
                                    <TableCell>
                                        {/* invite/uninvite based on their current room */}
                                        {
                                            invitedMemberMap[user._id] ?
                                            (
                                                <Button
                                                    onClick={() => handleUninviteUser(user._id)}
                                                    disabled={false}
                                                >
                                                    Uninvite
                                                </Button>
                                            )
                                            :
                                            (
                                                <Button
                                                    onClick={() => handleInviteUser(user._id)}
                                                    disabled={false}
                                                >
                                                    Invite
                                                </Button>
                                            )
                                        }
                                    </TableCell>
                                </TableRow>
                            ))
                            :
                            null
                        }
                    </TableBody>
                </Table>
                {
                    !users.data ?
                    (
                        <StyledEmptyInviteUsers>
                            <div>
                                <div>
                                    No users found
                                </div>
                            </div>
                        </StyledEmptyInviteUsers>
                    )
                    : 
                    null                
                }
            </Paper>
        </StyledInvitePlayers>
    );
};

const mapStateToProps = (state: IState) => ({
    users: state.user.userSearch,
});

export default connect(
    mapStateToProps,
)(InviteUsers);