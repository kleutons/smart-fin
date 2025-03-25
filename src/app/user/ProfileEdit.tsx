import ContainerTop from '../../components/ui/ContainerTop';
import ContainerMain from "../../components/ui/ContainerMain";
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import userImg from '../../assets/img/user.webp';
import ButtonPrimary from '../../components/ui/ButtonPrimary';
import ButtonSecondary from '../../components/ui/ButtonSecondary';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { TypeUser } from './../../services/UserService';
import { useUser } from '../../hooks/useUser';
import { Toaster } from 'react-hot-toast';


export default function ProfileEdit(){
  
    const { getUserEmail, updateUser } = useAuth();
    const { getByEmail, createOrUpdate } = useUser();
    
    const emptyData:TypeUser = {id: 0, name: '', email:'' , password: ''};
    
    const [dataEdit, setDataEdit] = useState<TypeUser>(emptyData);
    
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!dataEdit?.name || !dataEdit?.email) {
            alert("Por favor, preencha todos os campos!");
            return;
        }
        await createOrUpdate(dataEdit, false);
        await updateUser();
    }

    // Função genérica para lidar com alterações
    const handleOnChangeValue = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataEdit((prev) => ({ ...prev, [key]: e.target.value }));
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
        <Toaster/>

        <ContainerTop>
             <Header title='Editar Perfil' />
             <div className='h-18'><span></span></div>
        </ContainerTop>
        <ContainerMain>
            <div className='mb-10 flex flex-col gap-4 items-center -mt-24'>
                <div className='w-36 h-36 rounded-full shadow-xl'>
                    <img src={dataEdit?.urlImage ? dataEdit?.urlImage : userImg} className='rounded-full' />
                </div>
            </div>

        <form className='flex flex-col gap-5' onSubmit={handleSave}>
            <Input label='Nome:' value={dataEdit?.name} required  onChange={handleOnChangeValue('name')} />
            <Input type='email' label='Email:' value={dataEdit?.email} required onChange={handleOnChangeValue('email')} />
            <Input label='URL da Imagem:' value={dataEdit?.urlImage} onChange={handleOnChangeValue('urlImage')} />

            <div className='flex justify-between items-center gap-2 mt-3'>
                <ButtonSecondary type='button' wFull  onClick={() => window.history.back()}>
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