import ContainerTop from '../../components/ui/ContainerTop';
import ContainerMain from "../../components/ui/ContainerMain";
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import ButtonSecondary from '../../components/ui/ButtonSecondary';
import ButtonPrimary from '../../components/ui/ButtonPrimary';
import { TypeUser } from '../../services/UserService';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import toast, { Toaster } from 'react-hot-toast';
import generateHash from '../../utils/generateHash';
import { useNavigate } from 'react-router-dom';

interface NewPass{
    inputPassword: string,
    newPassword: string,
    confirmPassword: string
}

export default function EditPassword(){

    const navigate = useNavigate();
    const { getUserEmail, updateUser } = useAuth();
    const { getByEmail, createOrUpdate } = useUser();

    const emptyData:TypeUser = {id: 0, name: '', email:'' , password: ''};
    const [dataEdit, setDataEdit] = useState<TypeUser>(emptyData);
    const emptyNewPass:NewPass = {inputPassword: '', newPassword: '', confirmPassword:''};
    const [dataNewPass, setDataNewPass] = useState<NewPass>(emptyNewPass);

    

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const comparePass = await generateHash(dataNewPass.inputPassword);
        if(dataEdit.password !== comparePass){
            toast.error('A senha atual está incorreta, tente novamente!');
            return;
        }
        if(dataNewPass.newPassword !== dataNewPass.confirmPassword){
            toast.error('Confirmação da Senha esta diferente, tente novamente!');
            return;
        }else{
            const dataUpdateUser:TypeUser = {id:dataEdit.id, name: dataEdit.name, email: dataEdit.email, password: dataNewPass.newPassword, urlImage:dataEdit.urlImage};
            await createOrUpdate(dataUpdateUser);
            await updateUser();
            navigate('/profile');
        }

    }
    // Função genérica para lidar com alterações
    const handleOnChangeValue = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataNewPass((prev) => ({ ...prev, [key]: e.target.value }));
    };


    useEffect(()=>{
        const fetchUser = async () => {
            const emailLogin = getUserEmail();
            if(emailLogin){
                const useData = await getByEmail(emailLogin);
                if(useData) setDataEdit(useData)
            }
        }
        fetchUser();
    },[]);

    return(
        <>
        <Toaster />

        <ContainerTop>
             <Header title='Atualizar Senha' />
        </ContainerTop>
        <ContainerMain>
            <h2 className='font-semibold text-mainFontBold p-3 mb-6'> Segurança </h2>
            
        
            <form className='flex flex-col gap-5' onSubmit={handleSave}>
                <Input label='Senha Atual:' type='password' value={dataNewPass.inputPassword} onChange={handleOnChangeValue('inputPassword')} />
                <Input label='Nova Senha:' type='password' value={dataNewPass.newPassword} onChange={handleOnChangeValue('newPassword')} />
                <Input label='Confirme Nova Senha:' type='password' value={dataNewPass.confirmPassword} onChange={handleOnChangeValue('confirmPassword')}  />
    
                <div className='flex justify-between items-center gap-2 mt-3'>
                    <ButtonSecondary wFull  onClick={() => navigate('/profile')}>
                        Voltar
                    </ButtonSecondary>
                    <ButtonPrimary type='submit' wFull>
                        Salvar
                    </ButtonPrimary>
                </div>
            </form>
           
        </ContainerMain>
        </>
    )
}