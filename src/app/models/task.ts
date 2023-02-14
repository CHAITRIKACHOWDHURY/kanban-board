export interface TaskDetails {
    id?: string;
    title?: string;
    description?: string;
    status?: Task_Status;
}

export enum Task_Status {
    TO_DO = 'TO_DO',
    IMPLEMENTING = 'IMPLEMENTING',
    DONE = 'DONE'
}