import * as React from 'react';

import {
    StyledTabPanel,
} from './index.style';

interface IProps {
    index: number;
    value: number;
    children?: React.ReactElement | string;
}

const TabPanel: React.FC<IProps> = (props: IProps) => {
    const {
        index,
        value,
    } = props;

    if (index !== value) {
        return null;
    }

    return (
        <StyledTabPanel>
            { props.children }
        </StyledTabPanel>
    );
};

export default TabPanel;