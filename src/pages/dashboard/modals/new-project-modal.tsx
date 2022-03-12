import { DualOptionModal, Headline4, Input } from '@theturkeydev/gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { createProjects } from '../../../network/network';
import { ProjectType } from '../../project/project-type';

const FormWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px;
    padding: 16px;
    justify-items: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
`;

type NewProjectModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly addNewProject: (proj: ProjectType) => void
}

export const NewProjectModal = ({ show, requestClose, addNewProject }: NewProjectModalProps) => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [id, setId] = useState('');
    const [image, setImage] = useState('');
    const [changedId, setChangedId] = useState(false);

    const updateTitle = (title: string) => {
        setTitle(title);
        if (!changedId)
            setId(title.toLowerCase().replaceAll(' ', '-'));
    };

    const updateId = (id: string) => {
        setId(id);
        setChangedId(true);
    };

    const createProject = () => {
        createProjects(title, subtitle, id, image).then((proj) => {
            console.log(proj);
            addNewProject(proj);
            requestClose();
        });
    };

    return (
        <DualOptionModal show={show} requestClose={requestClose} primaryText='Create' onPrimaryClick={createProject} secondaryText='Cancel' onSecondaryClick={requestClose}>
            <Headline4>Create A New Project</Headline4>
            <FormWrapper>
                <Input name='title' label='Title' value={title} onChange={e => updateTitle(e.target.value)} />
                <Input name='subtitle' label='Subtitle' value={subtitle} onChange={e => setSubtitle(e.target.value)} />
                <Input name='id' label='Id' value={id} onChange={e => updateId(e.target.value)} />
                <Input name='image' label='Image' value={image} onChange={e => setImage(e.target.value)} />
            </FormWrapper>
        </DualOptionModal>
    );
};