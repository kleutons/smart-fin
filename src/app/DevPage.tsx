import ContainerMain from "../components/ui/ContainerMain";
import ContainerTop from "../components/ui/ContainerTop";
import Header from "../components/ui/Header";

export default function DevPage(){

    return(
        <>
         <ContainerTop>
             <Header title='Desenvolvedor' />
        </ContainerTop>
        <ContainerMain>
            Página do Desenvolvedor
        </ContainerMain>
        </>
    )
}