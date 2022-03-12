import { BaseTheme, Headline5, Subtitle1 } from '@theturkeydev/gobble-lib-react';
import styled, { ThemeProps } from 'styled-components';
import { AdaptiveLink } from '../../util/adaptive-link';
import { ProjectType } from './project-type';

const ProjectWrapper = styled.div`
    width: 200px;
    min-width: 200px;
    max-width: 200px;
    height: 200px;
    min-height: 200px;
    max-height: 200px;
    position: relative;
    background: ${({ theme }: ThemeProps<BaseTheme>) => theme.surface.color};
    border-radius: 8px;
    cursor: pointer;
`;

const ProjectName = styled.div`
    position: absolute;
    z-index: 1;
    width: 100%;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition-duration: 0.5s;
    color: #ffffff;
    ${ProjectWrapper}:hover & {
        opacity: 1;
        bottom: 40px;
    }
    
    display: grid;
    grid-template-rows: auto auto;
    text-align: center;
`;

const ProjectImage = styled.img`
    margin: 5px;
    opacity: 1;
    transition-duration: 0.5s;
    object-fit: contain;
    ${ProjectWrapper}:hover & {
        opacity: 0.2;
    }
`;

type ProjectProps = {
    readonly project: ProjectType
}
export const Project = ({ project }: ProjectProps) => {
    return (
        <ProjectWrapper className='anim-slide-in'>
            <AdaptiveLink link={`/project/${project.id}`}>
                <ProjectImage loading='lazy' src={project.image} width='190' height='190' />
                <ProjectName>
                    <Headline5>{project.title}</Headline5>
                    <Subtitle1>{project.subtitle}</Subtitle1>
                </ProjectName>
            </AdaptiveLink>
        </ProjectWrapper>
    );
};