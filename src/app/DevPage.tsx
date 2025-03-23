import ContactDev from "../components/ContactDev";
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
            <div className="flex flex-col gap-6 items-center mb-10">
                <div className="w-[144px] h-[144px] flex items-center justify-center">
                    <img src="https://avatars.githubusercontent.com/u/106082564?v=4" className="w-full h-full rounded-full object-cover object-cente"/>
                </div>
                <p>
                    Olá! Sou Cleuton Novais, mais conhecido como Kleuton.  Sou um programador apaixonado por tecnologia, sempre em busca de expandir minhas habilidades e explorar novas soluções em constante evolução.
                </p>
            </div>

            <h2 className="text-2xl font-bold mb-2">Projeto SmartFin</h2>
            <p className="mb-4">
                Este aplicativo é uma poderosa ferramenta para auxiliar os usuários no controle financeiro, proporcionando maior organização e clareza sobre a saúde financeira de empresas ou indivíduos. Com ele, o gerenciamento de gastos mensais se torna mais fácil e eficiente, promovendo decisões financeiras mais conscientes.
            </p>
            <h3 className="text-xl font-semibold mb-2">Tecnologias Utilizadas:</h3>
            <ul className="list-disc list-inside mb-4">
                <li><strong>FrontEnd:</strong> React, JavaScript com TypeScript e TailwindCSS</li>
                <li><strong>Banco de Dados:</strong> IndexDB</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Contato / Links:</h3>

            <ContactDev />
        </ContainerMain>
        </>
    )
}