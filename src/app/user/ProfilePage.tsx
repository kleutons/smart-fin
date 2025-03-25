import ContainerTop from '../../components/ui/ContainerTop';
import ContainerMain from "../../components/ui/ContainerMain";
import Header from '../../components/ui/Header';
import { KeyRound, LaptopMinimalCheck, LogOut, User } from 'lucide-react';
import userImg from '../../assets/img/user.webp';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { Toaster } from 'react-hot-toast';

const menuList = [
    {
        icon: User,
        label: "Editar Perfil",
        url: '/profile/edit'
    },
    {
        icon: KeyRound,
        label: "Atualizar Senha",
        url: '/profile/password'
    },
    {
        icon: LaptopMinimalCheck,
        label: "Desenvolvedor",
        url: '/dev'
    }
]

export default function ProfilePage(){

    const navigate = useNavigate();
    const {logout, dataUser} = useAuth();
    

    const handleLogout = () => {
        navigate('/');
        logout();
    }

    return(
        <>
        <Toaster />
        
         <ContainerTop>
             <Header title='Perfil' />
             <div className='h-18'><span></span></div>
        </ContainerTop>
        <ContainerMain>
            <div className='mb-10 flex flex-col gap-4 items-center -mt-24'>
                <div className='w-36 h-36 rounded-full shadow-xl'>
                    <img src={dataUser?.urlImage? dataUser.urlImage : userImg} className='rounded-full' />
                </div>
                <h1 className='text-mainFontBold font-semibold text-xl'>{dataUser? dataUser.name : 'Usuário'}</h1>
            </div>

            <div className='flex flex-col gap-6'>
                {menuList.map((item, index)=>(
                    <button key={index} className='flex gap-3 items-center cursor-pointer' onClick={()=>navigate(item.url)}>
                        <item.icon size={50} strokeWidth={1.5} className='bg-mainLightGreen p-2 rounded-2xl'  />
                        <p>{item.label}</p>
                    </button>
                ))}
                <button className='flex gap-3 items-center cursor-pointer' onClick={handleLogout}>
                    <LogOut size={50} strokeWidth={1.5} className='bg-mainLightGreen p-2 rounded-2xl'  />
                    <p>Sair</p>
                </button>
            </div>
        </ContainerMain>
        </>
    )
}