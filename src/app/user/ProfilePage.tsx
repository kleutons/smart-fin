import ContainerTop from '../../components/ui/ContainerTop';
import ContainerMain from "../../components/ui/ContainerMain";
import Header from '../../components/ui/Header';
import { KeyRound, LaptopMinimalCheck, LogOut, User } from 'lucide-react';
import userImg from '../../assets/img/user.webp';
import { useNavigate } from 'react-router';

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
    },
    {
        icon: LogOut,
        label: "Sair",
        url: '/profile'
    },
]

export default function ProfilePage(){

    const navigate = useNavigate();

    return(
        <>
         <ContainerTop>
             <Header title='Perfil' />
             <div className='h-18'><span></span></div>
        </ContainerTop>
        <ContainerMain>
            <div className='mb-10 flex flex-col gap-4 items-center -mt-24'>
                <div className='w-36 h-36 rounded-full shadow-xl'>
                    <img src={userImg} className='rounded-full' />
                </div>
                <h1 className='text-mainFontBold font-semibold text-xl'>Usuário</h1>
            </div>

            <div className='flex flex-col gap-6'>
                {menuList.map((item, index)=>(
                    <button key={index} className='flex gap-3 items-center' onClick={()=>navigate(item.url)}>
                        <item.icon size={50} strokeWidth={1.5} className='bg-mainLightGreen p-2 rounded-2xl'  />
                        <p>{item.label}</p>
                    </button>
                ))}
            </div>
        </ContainerMain>
        </>
    )
}