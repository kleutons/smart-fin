import ContainerTop from '../../components/ui/ContainerTop';
import ContainerMain from "../../components/ui/ContainerMain";
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import userImg from '../../assets/img/user.webp';
import ButtonPrimary from '../../components/ui/ButtonPrimary';
import ButtonSecondary from '../../components/ui/ButtonSecondary';


export default function ProfileEdit(){
    return(
        <>
         <ContainerTop>
             <Header title='Editar Perfil' />
             <div className='h-18'><span></span></div>
        </ContainerTop>
        <ContainerMain>
            <div className='mb-10 flex flex-col gap-4 items-center -mt-24'>
                <div className='w-36 h-36 rounded-full shadow-xl'>
                    <img src={userImg} className='rounded-full' />
                </div>
            </div>

        <div className='flex flex-col gap-5'>
            <Input label='Nome:' value='Kleuton Novais' />
            <Input label='Email:' value='kleuton@msn.com' />
            <Input label='Login:' value='kleuton' />

            <div className='flex justify-between items-center gap-2 mt-3'>
                <ButtonSecondary wFull  onClick={() => window.history.back()}>
                    Voltar
                </ButtonSecondary>
                <ButtonPrimary wFull>
                    Salvar
                </ButtonPrimary>
            </div>
        </div>

        </ContainerMain>
        </>
    )
}