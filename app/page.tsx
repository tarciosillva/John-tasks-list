"use client"
import TodoProvider from './context/TodoContext';
import TodoApp from './pages';

export default function Home() {
  return (
    <TodoProvider>
      <TodoApp/>
    </TodoProvider>
  )
}