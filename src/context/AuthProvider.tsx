import { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";


interface Props {
    children: ReactNode
}

export const AuthProvider = ({children}:Props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider 
            value={{
                isAuthenticated,
                login,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    )
}