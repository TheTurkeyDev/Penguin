import { BaseTheme, TextButton } from '@theturkeydev/gobble-lib-react';
import { ReactChild, useState } from 'react';
import styled, { ThemeProps } from 'styled-components';


const ContentWrapper = styled.div`
    position: relative;
    height: fit-content;
`;

const DropDownItems = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    width: max-content;
    background: ${({ theme }: ThemeProps<BaseTheme>) => theme.surface.color};
    display: grid;
    grid-template-columns: 1fr;
    border-radius: 5px;
`;

export const DropDownItem = styled.div`
    padding: 8px 16px;
    border-radius: 5px;
    &:hover {
        background: #ffffff22;
        cursor: pointer;
    }
`;

type ButtonDropdown = {
    readonly children: readonly ReactChild[]
}

export const ButtonDropdown = ({ children }: ButtonDropdown) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    return (
        <ContentWrapper>
            <TextButton onClick={() => setDropdownVisible(old => !old)}>{children[0]}</TextButton>
            {
                dropdownVisible &&
                <DropDownItems>
                    {children.slice(1)}
                </DropDownItems>
            }
        </ContentWrapper>
    );
};