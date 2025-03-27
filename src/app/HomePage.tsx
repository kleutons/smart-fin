import ContainerMain from "../components/ui/ContainerMain";
import ContainerTop from "../components/ui/ContainerTop";
import ButtonPrimary from "../components/ui/ButtonPrimary";
import { useNavigate } from "react-router";
import { useTransaction } from "../hooks/useTransaction ";
import { useEffect } from "react";
import { calculateSummary } from "../utils/calculateSummary";
import { useCategory } from "../hooks/useCategory";
import { topThreeExpensesCategory } from "../utils/topThreeExpensesCategory ";
import { IconCategory } from "../utils/IconsCategory";
import useAuth from "../hooks/useAuth";

export default function HomePage() {

    const { loadByMonth, transactions } = useTransaction();
    const { categories } = useCategory();
    const { saldo, despesas } = calculateSummary(transactions);
    const { dataUser } = useAuth();
    
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const monthNames = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const monthName = monthNames[month]; 
  

    const navigate = useNavigate();
    
    const topThree = topThreeExpensesCategory(transactions, categories);

    // Função para renderizar o ícone com base no nome salvo
    const renderIcon = (iconName: string) => {
      const icon = IconCategory.find((item) => item.name.toLowerCase() === iconName.toLowerCase());
      return icon ? <icon.icon size="65%" strokeWidth={1.5} /> : null; // Renderiza o ícone ou nada
    };


    useEffect(()=>{
      if(dataUser?.id){
        loadByMonth((month +1), year, dataUser.id);
      }
    },[dataUser]);

    return (
      <>
        <ContainerTop>
            <div className="text-2xl font-light pt-3.5">
                <p>Bem Vindo(a)</p>
                <p>{dataUser? dataUser.name : 'Usuário'}</p>
            </div>
        </ContainerTop>
        <ContainerMain>
          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-3">
                <div className="text-xl font-light">
                    <p>Entrada:</p>
                    <p className="text-3xl font-semibold text-mainFontBold">
                     {saldo.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                    </p>
                </div>

                <div className="text-xl font-light">
                    <p>Despesas:</p>
                    <p className="text-3xl font-semibold text-red-400">
                    {despesas.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                    </p>
                </div>
            </div>

            <div className="mt-3 bg-mainLightGreen rounded-4xl text-mainFontBold/65 p-6">
              <h2 className="font-semibold uppercase">
                {monthName} {year}
              </h2>
              <div className="flex gap-4">

                <div className="w-1/2 flex flex-col justify-center items-center border-r-2 border-mainFontBold/10 pr-2">
                  {topThree[0] && (
                    <>
                      {renderIcon(topThree[0].icon)} 
                      <p>{topThree[0].name} {topThree[0].percentage}%</p> 
                    </>
                  )}
                </div>

                <div className="w-1/2 flex flex-col">
                  {topThree.slice(1).map((item, index) => (
                    <div
                      key={index}
                      className={`flex w-full gap-2 justify-start items-center ${
                        index === 0 ? "border-b-2 border-mainFontBold/10" : "text-mainFontBold/65"
                      } p-2`}
                    >
                      {renderIcon(item.icon)} 
                      <div>
                        <p>{item.name} {item.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            <ButtonPrimary onClick={()=>navigate('/transactions')}>
              Ver Transações
            </ButtonPrimary>


           
          </div>

        </ContainerMain>
      </>
    )
  }
  