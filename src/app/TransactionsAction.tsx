import ButtonPrimary from "../components/ui/ButtonPrimary";
import ButtonSecondary from "../components/ui/ButtonSecondary";
import ContainerMain from "../components/ui/ContainerMain";
import ContainerTop from "../components/ui/ContainerTop";
import Header from "../components/ui/Header";
import Input from "../components/ui/Input";

export default function TransactionsAction(){

    return(
        <>
        <ContainerTop>
            <Header title="Adicionar Transação" />
        </ContainerTop>
        <ContainerMain>
            <Input label="Data:" />
            <Input label="Categoria:" />
            <Input label="Valor:" />
            
            <div className='flex justify-between items-center gap-2 mt-5'>
                <ButtonSecondary wFull  onClick={() => window.history.back()}>
                    Voltar
                </ButtonSecondary>
                <ButtonPrimary wFull>
                    Salvar
                </ButtonPrimary>
            </div>
        </ContainerMain>
        </>
    )
}