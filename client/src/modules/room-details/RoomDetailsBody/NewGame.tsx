import * as React from 'react';
import {
    StyledNewGame, 
} from './index.style';

interface IProps {

};

const NewGame: React.FC<IProps> = (props: IProps) => {
    return (
        <StyledNewGame>
            New Game
        </StyledNewGame>
    );
};

export default NewGame;