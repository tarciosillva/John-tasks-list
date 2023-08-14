import { BsCircle } from "react-icons/bs";
import BackgroundBanner from "../components/BackgroundBanner";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MdDragHandle } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti"
import { useTodoContext } from "../context/TodoContext"
import Checked from "../components/Checked";
import InputTodo from "../components/InputTodo";

export default function TodoApp() {
    const {
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
        setNewTodo,
    } = useTodoContext()

    return (
        <div>
            <BackgroundBanner />
            <div className=' h-screen flex justify-center'>
                <div className='absolute top-24'>
                    <h1 className='text-white tracking-[.40em]  mb-5 text-2xl font-semibold'>TODO</h1>

                    <div className='grid'>
                        <div className='flex bg-white p-3 rounded-sm items-center gap-2 laptop:w-[32rem] tablet:w-80 mobileL:w-[20rem] mobileS:w-[18rem] shadow-md'>
                            <BsCircle
                                size={20}
                                color={'#9aa8bc'}
                            />
                            <input
                                className='laptop:w-[32rem] tablet:w-80 mobileL:w-[20rem] mobileS:w-[18rem] focus:outline-none focus:ring-0 p-1 placeholder-gray-400 text-sm font-medium'
                                type="text"
                                placeholder='Type something and press Enter'
                                value={newTodo}
                                onKeyDown={(e) => handleKeyDown(e, newTodo, setNewTodo)}
                                onChange={(e) => setNewTodo(e.target.value)}
                            />
                        </div>
                    </div>

                    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                        <Droppable droppableId='todo list'>
                            {provided => (
                                <ul className='laptop:w-[32rem] tablet:w-80 mobileL:w-[20rem] mobileS:w-[18rem] mt-14 shadow-lg' {...provided.droppableProps} ref={provided.innerRef}>
                                    {todos.map((item, index) => (
                                        <Draggable key={index} draggableId={item.name} index={index}>
                                            {provided => (
                                                <div
                                                    key={index}
                                                    className={`${draggingItem === item.name && ('shadow-xl pb-14')} border bg-white grid w-full px-3 pt-3`}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <div className='flex items-center gap-2'>
                                                        <Checked checked={item.checked} handleCheck={() => handleCheck(index, !item.checked)} />
                                                        <InputTodo
                                                            item={item}
                                                            indexTask={index}
                                                            handleEditTask={handleEditTodoName}
                                                        />
                                                        <TiDeleteOutline size={25} color={'gray'} style={{ cursor: "pointer" }} onClick={() => handleDeleteItem(index)} />
                                                    </div>
                                                    <div className='mt-2 grid'>
                                                        {item.subTasks.map((subtask, indexSubTask) => (
                                                            <div key={indexSubTask} className='flex items-center pl-8 gap-2 mb-1'>
                                                                <Checked checked={subtask.checked} handleCheck={() => handleCheckSubTask(index, indexSubTask, !subtask.checked)} />
                                                                <InputTodo
                                                                    item={subtask}
                                                                    indexTask={index}
                                                                    indexSubTask={indexSubTask}
                                                                    handleEditSubTask={handleEditSubTaskName}
                                                                />
                                                                <TiDeleteOutline size={25} color={'gray'} style={{ cursor: "pointer" }} onClick={() => handleDeleteSubTaskItem(index, indexSubTask)} />
                                                            </div>

                                                        ))}
                                                    </div>
                                                    <div className='flex justify-center pb-2'>
                                                        <button
                                                            className='absolute text-xs mt-1 left-10 cursor-pointer text-gray-400 hover:text-sky-500'
                                                            onClick={() => handleAddSubTasks(index)}
                                                        >
                                                            add sub tasks
                                                        </button>
                                                        <MdDragHandle size={25} color={'gray'} />
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <div className='bg-white border-slate-200 border-t-0 border-[.1px] p-3 flex items-center gap-2 w-full justify-around'>
                                        <p className='text-xs text-gray-500'>{todos.filter(todo => !todo.checked).length} item(s) left</p>
                                        <p className='text-xs text-gray-500'>completed items {todos.filter(todo => todo.checked).length}</p>
                                    </div>
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <p className='text-center text-sm p-10 text-gray-500'>Drag and drop to reorder the list</p>
                </div>
            </div>
            {createTextError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute right-4 top-4" role="alert">
                    <span className="block sm:inline">{createTextError}</span>
                </div>
            )}
        </div>
    )
}