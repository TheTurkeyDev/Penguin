import { Environment } from './enviornment';

export type ProjectInfo = {
    readonly title: string
    readonly environments: readonly Environment[]
}