import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { CheckSquare, LogOut, Menu } from 'lucide-react'

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <CheckSquare className="mr-2" />
          <span className="hidden sm:inline">Todo App</span>
        </Link>
        <div className="sm:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            <Menu />
          </button>
        </div>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:block`}>
          {isAuthenticated ? (
            <div className="flex flex-col sm:flex-row items-center">
              <span className="mr-4 mb-2 sm:mb-0">Welcome, {user}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <LogOut className="mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <nav className="flex flex-col sm:flex-row">
              <Link to="/login" className="mr-0 sm:mr-4 mb-2 sm:mb-0 hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header