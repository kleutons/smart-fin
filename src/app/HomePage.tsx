import { Banknote, Car, Utensils } from "lucide-react";
import ContainerMain from "../components/ui/ContainerMain";
import ContainerTop from "../components/ui/ContainerTop";
import ButtonPrimary from "../components/ui/ButtonPrimary";
import { useNavigate } from "react-router";

export default function HomePage() {

    const navigate = useNavigate();

    return (
      <>
        <ContainerTop>
            <div className="text-2xl font-light pt-3.5">
                <p>Bem Vindo(a)</p>
                <p>Úsuario</p>
            </div>
        </ContainerTop>
        <ContainerMain>
          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-3">
                <div className="text-xl font-light">
                    <p>Seu saldo total:</p>
                    <p className="text-3xl font-semibold text-mainFontBold">R$ 0,00</p>
                </div>

                <div className="text-xl font-light">
                    <p>Despesas:</p>
                    <p className="text-3xl font-semibold text-red-400">R$ 0,00</p>
                </div>
            </div>

            <div className="mt-3 bg-mainLightGreen rounded-4xl text-mainFontBold/65 p-6">
              <h2 className="font-semibold uppercase">
                Março 2025
              </h2>
              <div className="flex gap-4">

                <div className="w-2/3 flex flex-col justify-center items-center border-r-2 border-mainFontBold/10 pr-2">
                  <Car size={60} strokeWidth={1.5}  />
                  <p>Veiculo 30%</p>
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="flex w-full gap-2 justify-start items-center border-b-2 border-mainFontBold/10 p-2">
                      <Banknote size={40} strokeWidth={1.5} />
                      <div>
                        <p>Salário 30%</p>
                      </div>
                    </div>
                    <div className="flex w-full gap-2 justify-start items-center text-mainFontBold/65 p-2">
                      <Utensils size={40} strokeWidth={1.5} />
                      <div>
                        <p>Alimentação 10%</p>
                      </div>
                    </div>
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
  