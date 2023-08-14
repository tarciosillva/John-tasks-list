import { ITodos } from "../@type";

export const getAllTodos = (): ITodos[] | [] => {
    try {
      const storedTodoJSON = localStorage.getItem('todo');
      if (storedTodoJSON) {
        const storedTodo = JSON.parse(storedTodoJSON) as ITodos[];
        return storedTodo;
      }
    } catch (error) {
      console.error('Error while getting todos:', error);
    }
    return [];
  };
  
  export const updateTodo = (todo: ITodos[]) => {
    try {
      const todoJSON = JSON.stringify(todo);
      localStorage.setItem('todo', todoJSON);
    } catch (error) {
      console.error('Error while updating todos:', error);
    }
  };