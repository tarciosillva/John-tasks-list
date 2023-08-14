import { ITodoItem } from "../@type"

interface InputTodoProps {
    indexTask: number,
    indexSubTask?: number
    item: ITodoItem
    handleEditTask?: (index: number, value: string) => void
    handleEditSubTask?: (index: number, indexSubTask: number, value: string) => void
}

export default function InputTodo(props: InputTodoProps) {
    return (
        <input
            className={`w-full focus:outline-none focus:ring-0 p-1 text-gray-500 placeholder-gray-500 text-sm font-medium ${props.item.checked && 'line-through'}`}
            type="text"
            value={props.item.name}
            autoFocus
            onChange={(e) => props.handleEditTask ? (
                props.handleEditTask(props.indexTask, e.target.value)
            ) : props.handleEditSubTask ? (
                props.handleEditSubTask(props.indexTask, props.indexSubTask || 0, e.target.value)
            ) : (() => { })}
        />
    )
}