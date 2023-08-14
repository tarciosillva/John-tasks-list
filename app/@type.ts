export interface ITodoItem {
    id: number,
    name: string,
    checked: boolean
}

export interface ITodos extends ITodoItem {
    subTasks: ITodoItem[]
}