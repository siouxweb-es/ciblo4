// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react'
import { User, Role, AuthResponse, RegisterDTO } from '../types' // Importamos RegisterDTO
import * as apiService from '../services/apiService'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  // --- NUEVO PARA EL REGISTRO ---
  register: (data: RegisterDTO) => Promise<void>
  refreshUserData: (updatedUser: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // ... (código de carga de localStorage se queda igual) ...
    try {
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      if (storedToken && storedUser) {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error('Error al cargar datos de auth:', error)
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleLoginSuccess = (data: AuthResponse) => {
    setUser(data.user)
    setToken(data.access_token)
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.access_token)

    // Redirigir según el rol
    if (data.user.role === Role.Admin) {
      navigate('/panel-de-organizador')
    } else if (data.user.role === Role.Organizer) {
      navigate('/panel-de-organizador')
    } else {
      navigate('/panel-de-usuario')
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const data = await apiService.login(email, password)
      handleLoginSuccess(data)
    } catch (error) {
      setIsLoading(false)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // ... (código de logout se queda igual) ...
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/')
  }

  const refreshUserData = (updatedUser: User) => {
    // ... (código de refresh se queda igual) ...
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  // --- NUEVO PARA EL REGISTRO ---
  const register = async (data: RegisterDTO) => {
    setIsLoading(true)
    try {
      // 1. Llama a la API simulada para registrar
      const authData = await apiService.register(data)
      // 2. Si tiene éxito, inicia sesión automáticamente
      handleLoginSuccess(authData)
    } catch (error) {
      setIsLoading(false)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register, // Exponemos la nueva función
        refreshUserData
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
