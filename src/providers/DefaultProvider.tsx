import { ReactNode } from "react";
import { AuthProvider } from '../context/AuthProvider';

interface iProps{
    children: ReactNode
}

export default function DefaultProvider({children}:iProps) {
    return(
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}