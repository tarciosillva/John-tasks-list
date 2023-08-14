// context/TodoContext.tsx

import React, { SetStateAction, createContext, useContext, useState, useEffect } from 'react';

import { ITodos } from '../@type';
import { DragStart, DropResult } from 'react-beautiful-dnd';
import { getAllTodos, updateTodo } from '../utils/storage';

interface TodoContextProps {
    todos: ITodos[],
    setTodos: React.Dispatch<SetStateAction<ITodos[]>>
    newTodo: string,
    setNewTodo: React.Dispatch<SetStateAction<string>>
    draggingItem: string,
    setDraggingItem: React.Dispatch<SetStateAction<string>>,
    createTextError: string,
    setCreateTextError: React.Dispatch<SetStateAction<string>>
    onDragStart: (start: DragStart) => void,
    onDragEnd: (result: DropResult) => void
    handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>, newTodo: string, setNewTodo: React.Dispatch<SetStateAction<string>>) => void
    handleAddSubTasks: (index: number) => void
    handleCheck: (index: number, value: boolean) => void
    handleCheckSubTask: (indexTodoItem: number, indexSubTask: number, value: boolean) => void
    handleEditTodoName: (index: number, text: string) => void
    handleEditSubTaskName: (indexTodoItem: number, indexSubTask: number, text: string) => void
    handleDeleteItem: (index: number) => void
    handleDeleteSubTaskItem: (indexTodoItem: number, indexSubTask: number,) => void
}

export const TodoContext = createContext<TodoContextProps>({
    todos: [],
    setTodos: () => { },
    newTodo: '',
    setNewTodo: () => { },
    draggingItem: '',
    setDraggingItem: () => { },
    createTextError: '',
    setCreateTextError: () => { },
    onDragStart: () => { },
    onDragEnd: () => { },
    handleKeyDown: () => { },
    handleAddSubTasks: () => { },
    handleCheck: () => { },
    handleCheckSubTask: () => { },
    handleEditTodoName: () => { },
    handleEditSubTaskName: () => { },
    handleDeleteItem: () => { },
    handleDeleteSubTaskItem: () => { }
});

export default function TodoProvider({ children }: any) {
    const [todos, setTodos] = useState<ITodos[]>([]);
    const [newTodo, setNewTodo] = useState<string>('')

    const [draggingItem, setDraggingItem] = useState<string>('');

    const [createTextError, setCreateTextError] = useState<string>('')

    useEffect(() => {
        if (getAllTodos()) {
            setTodos(getAllTodos())
        }
    }, [])

    useEffect(() => {
        if (createTextError) {
            setTimeout(() => {
                setCreateTextError("")
            }, 2000)
        }
    }, [createTextError])

    const onDragStart = (start: DragStart) => {
        setDraggingItem(start.draggableId)
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const newTodos = Array.from(todos);
        const [reorderedTodo] = newTodos.splice(result.source.index, 1);
        newTodos.splice(result.destination.index, 0, reorderedTodo);

        setTodos(newTodos);
        updateTodo(newTodos)
        setDraggingItem('')
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, newTodo: string, setNewTodo: React.Dispatch<SetStateAction<string>>) => {
        setCreateTextError('')
        if (event.key === 'Enter') {
            event.preventDefault();
            if (newTodo.trim() !== '') {
                var todosListCopy = Array.from(todos)
                todosListCopy.push({ id: Date.now(), name: newTodo.trim(), checked: false, subTasks: [] })
                setTodos([...todosListCopy])
                updateTodo([...todosListCopy])
                setNewTodo('');
            } else {
                setCreateTextError('Please, typing your task')
            }
        }
    };

    const handleAddSubTasks = (index: number) => {
        var todosListCopy = Array.from(todos)
        todosListCopy[index].subTasks.push({
            id: Date.now(),
            name: "",
            checked: false
        })
        setTodos([...todosListCopy]);
        updateTodo([...todosListCopy])
    };

    const handleCheck = (index: number, value: boolean) => {
        var todosListCopy = Array.from(todos)
        todosListCopy[index].checked = value
        setTodos([...todosListCopy])
        updateTodo([...todosListCopy])
    }

    const handleCheckSubTask = (indexTodoItem: number, indexSubTask: number, value: boolean) => {
        var todosListCopy = Array.from(todos)
        todosListCopy[indexTodoItem].subTasks[indexSubTask].checked = value
        setTodos([...todosListCopy])
        updateTodo([...todosListCopy])
    }

    const handleEditTodoName = (index: number, text: string) => {
        var todosListCopy = Array.from(todos)
        todosListCopy[index].name = text
        setTodos([...todosListCopy])
        updateTodo([...todosListCopy])
    }

    const handleEditSubTaskName = (indexTodoItem: number, indexSubTask: number, text: string) => {
        var todosListCopy = Array.from(todos)
        todosListCopy[indexTodoItem].subTasks[indexSubTask].name = text
        setTodos([...todosListCopy])
        updateTodo([...todosListCopy])
    }

    const handleDeleteItem = (index: number) => {
        var todosListCopy = Array.from(todos)
        todosListCopy.splice(index, 1)
        setTodos([...todosListCopy])
        updateTodo([...todosListCopy])
    }

    const handleDeleteSubTaskItem = (indexTodoItem: number, indexSubTask: number,) => {
        var todosListCopy = Array.from(todos)
        todosListCopy[indexTodoItem].subTasks.splice(indexSubTask, 1)
        setTodos([...todosListCopy])
        updateTodo([...todosListCopy])
    }

    return (
        <TodoContext.Provider value={{
            createTextError,
            draggingItem,
            newTodo,
            todos,
            handleAddSubTasks,
            handleCheck,
            handleCheckSubTask,
            handleDeleteItem,
            handleDeleteSubTaskItem,
            handleEditSubTaskName,
            handleEditTodoName,
            handleKeyDown,
            onDragEnd,
            onDragStart,
            setCreateTextError,
            setDraggingItem,
            setNewTodo,
            setTodos,
        }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = (): TodoContextProps => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};
