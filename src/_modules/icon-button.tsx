import styled from 'styled-components';

const IconWrapper = styled.i`
    font-size: 1.5em;
`;

type IconButtonProps = {
    readonly icon: string
}
export const IconButton = ({ icon }: IconButtonProps) => {
    return (
        <IconWrapper className={icon} />
    );
};