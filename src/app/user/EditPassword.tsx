import ContainerTop from '../../components/ui/ContainerTop';
import ContainerMain from "../../components/ui/ContainerMain";
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import ButtonSecondary from '../../components/ui/ButtonSecondary';
import ButtonPrimary from '../../components/ui/ButtonPrimary';

export default function EditPassword(){
    return(
        <>
         <ContainerTop>
             <Header title='Atualizar Senha' />
        </ContainerTop>
        <ContainerMain>
            <h2 className='font-semibold text-mainFontBold p-3 mb-6'> Segurança </h2>
             <div className='flex flex-col gap-5'>
                <Input label='Senha Atual:' />
                <Input label='Nova Senha:' />
                <Input label='Confirme Nova Senha:' />
    
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