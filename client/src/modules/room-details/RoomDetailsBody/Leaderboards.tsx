import * as React from 'react';
import {
    StyledLeaderboards, 
} from './index.style';

interface IProps {

};

const Leaderboards: React.FC<IProps> = (props: IProps) => {
    return (
        <StyledLeaderboards>
            Leaderboards
        </StyledLeaderboards>
    );
};

export default Leaderboards;