import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import UserService, { TypeUserReturn } from "../services/UserService";
import toast from "react-hot-toast";
import generateHash from "../utils/generateHash";


interface Props {
    children: ReactNode
}

export const AuthProvider = ({children}:Props) => {
    const service = new UserService();
    const emailLocalStorage = 'userEmail';    
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(emailLocalStorage)? true : false);
    const [dataUser, setDataUser] = useState<TypeUserReturn | undefined>(undefined);


    const setItemWithExpiration = (key: string, value: string, expirationInDays: number) => {
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expirationInDays * 24 * 60 * 60 * 1000);
        const data = {
            value,
            expiration: expirationDate.toISOString()
        };
        localStorage.setItem(key, JSON.stringify(data));
    };
    
    const getItemWithExpiration = (key: string): string | null => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;
    
        const item = JSON.parse(itemStr);
        const now = new Date();
    
        if (new Date(item.expiration) < now) {
            localStorage.removeItem(key); 
            return null;
        }
        return item.value;
    };
    

    const login = async (email:string, password:string):Promise<boolean> => {
        setIsAuthenticated(false);

        const userLogin = await service.getByEmail(email);
        const hasPass = await generateHash(password);

        if(userLogin && userLogin.password === hasPass){
            toast.success('Login Realizado com Sucesso!');
            setItemWithExpiration(emailLocalStorage, userLogin.email, 30);
            setIsAuthenticated(true);
            return true;
        }else{
            toast.error('Dados Inválido!');
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem(emailLocalStorage);
    };

    const getUserEmail = (): string | undefined => {
        const userEmail = getItemWithExpiration(emailLocalStorage);
        return userEmail ? userEmail : undefined;
    };

    const updateUser = async () => {
        const userEmail = getUserEmail(); 
        if(userEmail){
            const dataUserLogin = await service.getByEmail(userEmail);
            if(dataUserLogin){
                setDataUser({id:dataUserLogin.id, name: dataUserLogin.name, email: dataUserLogin.email, urlImage: dataUserLogin.urlImage});
                setItemWithExpiration(emailLocalStorage, dataUserLogin.email, 30);
            }
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            const userEmail = getUserEmail(); 
            if(userEmail){
                const dataUserLogin = await service.getByEmail(userEmail);
                setDataUser(dataUserLogin? {id:dataUserLogin.id, name: dataUserLogin.name, email: dataUserLogin.email, urlImage: dataUserLogin.urlImage} : undefined)
            }
        };
        fetchUser();
    },[isAuthenticated])

    return (
        <AuthContext.Provider 
            value={{
                isAuthenticated,
                login,
                logout,
                dataUser,
                getUserEmail,
                updateUser
            }}>
            {children}
        </AuthContext.Provider>
    )
}