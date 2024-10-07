import React, { useState } from 'react'
import { useTodoStore } from '../stores/todoStore'
import { useAuthStore } from '../stores/authStore'
import { Plus, Trash2, Check, X } from 'lucide-react'

const TodoList: React.FC = () => {
  const [newTodo, setNewTodo] = useState('')
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore()
  const { user } = useAuthStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim() && user) {
      addTodo(user, newTodo.trim())
      setNewTodo('')
    }
  }

  const userTodos = user ? todos[user] || [] : []

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
      <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Your Todo List</h2>
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col sm:flex-row">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-grow px-3 py-2 border rounded-md sm:rounded-r-none focus:outline-none focus:ring focus:border-blue-300 mb-2 sm:mb-0"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md sm:rounded-l-none hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
          >
            <Plus className="mr-2" />
            Add
          </button>
        </form>
        <ul className="space-y-3">
          {userTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-md"
            >
              <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => user && toggleTodo(user, todo.id)}
                  className={`p-1 rounded-full ${
                    todo.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
                  } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                >
                  {todo.completed ? <Check size={18} /> : <X size={18} />}
                </button>
                <button
                  onClick={() => user && removeTodo(user, todo.id)}
                  className="p-1 rounded-full bg-red-500 hover:bg-red-600 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoList