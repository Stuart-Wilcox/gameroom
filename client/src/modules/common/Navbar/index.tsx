import * as React from 'react';
import * as Redux from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import IState from 'src/redux/states';
import performLogout from 'src/redux/actions/logout';

import {
    StyledNavbar,
    StyledNavbarItemGroup,
    StyledNavbarItem,
} from './index.style';

const Navbar: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const {
        history,
    } = props;

    const dispatch = Redux.useDispatch();

    const user = Redux.useSelector((state: IState) => {
        return state.user.currentUser.data;
    });

    const onClickRooms = () => {
        history.push('/rooms');
    };

    const onClickCurrentRoom = () => {
        history.push(`/rooms/${user?.currentRoom}`);
    };

    const onClickLogout = () => {
        dispatch(performLogout(user?.username || ''));
    };

    return (
        <StyledNavbar>
            <StyledNavbarItemGroup>
                <StyledNavbarItem
                    onClick={() => onClickRooms()}
                >
                    Rooms
                </StyledNavbarItem>
            </StyledNavbarItemGroup>
            <StyledNavbarItemGroup>
                {
                    !!user?.currentRoom &&
                    <StyledNavbarItem
                        onClick={() => onClickCurrentRoom()}
                    >
                        Go To Current Room
                    </StyledNavbarItem>
                }
            </StyledNavbarItemGroup>
            <StyledNavbarItemGroup>
                <StyledNavbarItem
                    onClick={() => onClickLogout()}
                >
                    Logout
                </StyledNavbarItem>
            </StyledNavbarItemGroup>
        </StyledNavbar>
    );
};

export default withRouter(Navbar);