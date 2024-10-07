import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoState {
  todos: Record<string, Todo[]>
  addTodo: (userId: string, text: string) => void
  toggleTodo: (userId: string, id: number) => void
  removeTodo: (userId: string, id: number) => void
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: {},
      addTodo: (userId, text) =>
        set((state) => ({
          todos: {
            ...state.todos,
            [userId]: [
              ...(state.todos[userId] || []),
              { id: Date.now(), text, completed: false },
            ],
          },
        })),
      toggleTodo: (userId, id) =>
        set((state) => ({
          todos: {
            ...state.todos,
            [userId]: state.todos[userId].map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
          },
        })),
      removeTodo: (userId, id) =>
        set((state) => ({
          todos: {
            ...state.todos,
            [userId]: state.todos[userId].filter((todo) => todo.id !== id),
          },
        })),
    }),
    {
      name: 'todo-storage',
    }
  )
)