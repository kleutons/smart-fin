import { useNavigate } from "react-router";
import LogoSvg from "../assets/svg/logo";
import useAuth from "../hooks/useAuth";
import Input from "../components/ui/Input";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import SpinSvg from "../assets/svg/spin";

export default function LoginPage(){

    const navigate = useNavigate();
    const {login, loginDefault} = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [load, setLoad] = useState<boolean>(false);

    const handleLoginDefault = async () => {
        setLoad(true);
        const isLogin = await loginDefault();
        setTimeout(() => {
            if(isLogin) navigate('/');
            setLoad(false);
        }, 1400);
        
    }     
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoad(true);
        const isLogin = await login(email, password);
        setTimeout(() => {
            if(isLogin) navigate('/');
            setLoad(false);
        }, 1400);
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
            {
                load ? (
                    <div className="flex items-center justify-center">
                        <SpinSvg /> Carregando...
                    </div>
                ):(
                    <>
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
                            <p onClick={handleLoginDefault} className="cursor-pointer">Entrar Sem Conta</p>
                            <p onClick={() => navigate('/create-account') } className="cursor-pointer">Criar uma Conta</p>
                        </div>
                    </>
                )
            }
        </div>
    </main>
    );
} 