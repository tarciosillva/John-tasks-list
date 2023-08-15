import { ChangeEvent } from "react"
import { ITodoItem } from "../@type"

interface InputTodoProps {
    indexTask: number,
    indexSubTask?: number
    item: ITodoItem
    handleEditTask?: (index: number, value: string) => void
    handleEditSubTask?: (index: number, indexSubTask: number, value: string) => void
    onKeyDownHandleAddSubTasks?: (index: number) => void
    placeholder?:string
}

export default function InputTodo(props: InputTodoProps) {
    const addSubTasks = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && props.indexTask) {
            props.onKeyDownHandleAddSubTasks?.(props.indexTask)
        }
    }

    const editTask = (e: ChangeEvent<HTMLInputElement>) => {
        if (props.handleEditTask) {
            props.handleEditTask(props.indexTask, e.target.value)
        } else if (props.handleEditSubTask) {
            props.handleEditSubTask(props.indexTask, props.indexSubTask || 0, e.target.value)
        }
    }

    return (
        <input
            className={`w-full focus:outline-none focus:ring-0 p-1 text-gray-500 placeholder-gray-400 text-sm font ${props.item.checked && 'line-through'}`}
            type="text"
            value={props.item.name}
            autoFocus
            onChange={editTask}
            onKeyDown={addSubTasks}
            placeholder={props.placeholder}
        />
    )
}