import { useNavigate } from "react-router";
import LogoSvg from "../assets/svg/logo";
import useAuth from "../hooks/useAuth";
import Input from "../components/ui/Input";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function LoginPage(){

    const navigate = useNavigate();
    const {login} = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        
        navigate('/');
    }

     
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isLogin = await login(email, password);
        if(isLogin)  setTimeout(() => navigate('/'), 2000);  
    }
    return(
    <main className="fixed left-0 right-0 top-0 flex flex-col bottom-0 items-center justify-center bg-emerald-400">
        <Toaster />

        <div className="max-w-md flex flex-col gap-5">
            <div className="flex flex-col items-center text-mainFontBold justify-center">
                <LogoSvg />
                <h1 className="text-5xl font-semibold text-white p-4">
                    SmartFin
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        
                <div className="flex flex-col gap-1">
                    <Input type="email" label="Email / Login:" value={email} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    <Input type="password" label="Senha:" value={password} required  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                </div>

                <button type="submit" className={`bg-mainFontBold text-mainLightGreen font-semibold py-2 px-3 rounded-xl cursor-pointer `} >
                    Fazer Login
                </button>
            </form>

            <div className="flex flex-col justify-center items-center gap-2 underline">
                <p onClick={handleLogin}>Entrar Sem Conta</p>
                <p onClick={() => navigate('/create-account') }>Criar uma Conta</p>
            </div>
        </div>
    </main>
    );
}