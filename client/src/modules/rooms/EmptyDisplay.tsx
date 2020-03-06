import * as React from 'react';

import {
  StyledEmptyDisplay
} from './index.style';
import { Button } from '../common';

interface IProps {
  onCreateRoom: () => void;
}

const EmptyDisplay: React.FC<IProps> = (props: IProps) => {
  const {
    onCreateRoom,
  } = props;
  
  return (
    <StyledEmptyDisplay>
      <div>
        <div>
          No Rooms are Available
        </div>
        <Button
          variant={'contained'}
          color={'primary'}
          onClick={() => onCreateRoom()}
        >
          Create Room
        </Button>
      </div>
    </StyledEmptyDisplay>
  );
}

export default EmptyDisplay;
