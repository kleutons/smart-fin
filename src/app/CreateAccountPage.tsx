import { useNavigate } from "react-router";
import LogoSvg from "../assets/svg/logo";
import Input from "../components/ui/Input";
import { useState } from "react";
import { TypeUser } from "../services/UserService";
import { useUser } from "../hooks/useUser";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";

export default function CreateAccountPage(){

    const [newUser, setNewUser] = useState<TypeUser>({id: 0, name: '', email: '', password:''});
    const [confirmPass, setConfirmPass] = useState<string>('');
    const { createOrUpdate  } = useUser();
    const { login } = useAuth();
    
    const navigate = useNavigate();

    const handleLogin = async () => {
        await login(newUser.email, newUser.password);
        // navigate('/login');
    }

    const handleConfirmPass = () => {
        if(newUser.password.length < 6 ){
            toast.error('A senha deve conter no mínimo 6 caracteres!');
            return false;
        } 
            
        if (newUser.password !== confirmPass) {
            toast.error('As senhas não coincidem. Por favor, tente novamente.');
            return false;
        }
        return true;
    }

    // Salvar ou atualizar
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newUser?.name || !newUser?.email || !newUser.password ) {
            toast.error("Por favor, preencha todos os campos!");
        return;
        }

        if(!handleConfirmPass()) return;
        
        await createOrUpdate(newUser);
        await handleLogin();     
        setTimeout(() => navigate('/'), 2000);  
    };

    return(
    <main className="fixed left-0 right-0 top-0 flex flex-col bottom-0 items-center justify-center bg-emerald-400">
        <Toaster />

        <div className="max-w-md flex flex-col gap-5">
            <div className="flex flex-col items-center text-mainFontBold justify-center">
                <LogoSvg size={60} />
                <h1 className="text-3xl font-semibold text-white p-4">
                    SmartFin
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <Input label="Nome:" required  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}  />
                    <Input type="email" label="Seu Email" required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}  />
                    <Input type="password" label="Sua Senha:" required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewUser((prev) => ({ ...prev, password: e.target.value }))} />
                    <Input type="password" label="Confirme a Senha:" required onChange={(e: React.FocusEvent<HTMLInputElement>) => setConfirmPass(e.target.value) } />
                </div>

                <button type="submit" className={`bg-mainFontBold text-mainLightGreen font-semibold py-2 px-3 rounded-xl cursor-pointer `} >
                    Criar Nova Conta
                </button>
            </form>
            
            <p onClick={() =>  navigate('/login')} className="text-center">{'<'} Voltar, Fazer Login</p>
            
        </div>
    </main>
    );
}