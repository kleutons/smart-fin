import { createContext } from "react"
import { TypeUserReturn } from "../services/UserService";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email:string, password:string) => Promise<boolean>; 
    logout: () => void;
    dataUser: TypeUserReturn | undefined;
    getUserEmail: () => string | undefined;
    updateUser: () => Promise<void>;
}

const initialContextValue: AuthContextType ={
    isAuthenticated: false,
    login: async () => false,
    logout: () => {},
    dataUser: undefined,
    getUserEmail: () => undefined,
    updateUser: async () => {}
}

export const AuthContext = createContext<AuthContextType>(initialContextValue);