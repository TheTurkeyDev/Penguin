import { ContainedButton, Modal, OutlinedButton, WithChildren } from '@theturkeydev/gobble-lib-react';

type DualOptionModalProps = WithChildren & {
    readonly show: boolean
    readonly requestClose: () => void
    readonly primaryText: string
    readonly onPrimaryClick: () => void
    readonly secondaryText: string
    readonly onSecondaryClick: () => void
}
export const DualOptionModal = ({ show, requestClose, children, primaryText, onPrimaryClick, secondaryText, onSecondaryClick }: DualOptionModalProps) => {

    return <Modal show={show} requestClose={requestClose}>
        <>
            {children}
            <div>
                <OutlinedButton onClick={onSecondaryClick}>{secondaryText}</OutlinedButton>
                <ContainedButton onClick={onPrimaryClick}>{primaryText}</ContainedButton>
            </div>
        </>
    </Modal>;
};