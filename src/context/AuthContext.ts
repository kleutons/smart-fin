import { createContext } from "react"

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void; 
    logout: () => void;
}

const initialContextValue: AuthContextType ={
    isAuthenticated: false,
    login: () => {},
    logout: () => {}
}

export const AuthContext = createContext<AuthContextType>(initialContextValue);