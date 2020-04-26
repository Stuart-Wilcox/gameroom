import styled from 'styled-components';

export const StyledNavbar = styled.div`
    width: calc(100% - 48px);
    height: 48px;
    background-color: #1A1A1A;
    color: #FFFFFF;
    display: flex;
    padding: 0px 24px;
    justify-content: space-between;
    align-items: center;
`;

export const StyledNavbarItemGroup = styled.div`
    display: flex;
`;

export const StyledNavbarItem = styled.div`
    padding: 8px;
    margin: 0px 8px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        cursor: pointer;
        background-color: #555555;
    }
`;