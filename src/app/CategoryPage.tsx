import { Car, HandCoins, Home, Plus, Utensils } from "lucide-react";
import ButtonPrimary from "../components/ui/ButtonPrimary";
import ContainerMain from "../components/ui/ContainerMain";
import ContainerTop from "../components/ui/ContainerTop";
import Header from "../components/ui/Header";
import { useNavigate } from "react-router";


const categories = [
    {
        id: 1,
        name: 'Transporte',
        icon: Car
    },
    {
        id: 2,
        name: 'Alimentação',
        icon: Utensils
    },
    {
        id: 3,
        name: 'Casa',
        icon: Home
    },
    {
        id: 4,
        name: 'Fixa',
        icon: HandCoins
    }
]

export default function CategoryPage(){
    const navigate = useNavigate();

    return(
        <>
         <ContainerTop>
            <Header title="Categorias" />
        </ContainerTop>
        <ContainerMain>
            <div className="fixed bottom-20 right-4 opacity-80 hover:opacity-100">
                <ButtonPrimary  onClick={()=>navigate('/categories/action')}>
                    <Plus size={24}  />
                </ButtonPrimary>
            </div>

            <div className=" grid grid-cols-3 gap-4">
                { categories.map((item)=>(
                    <div key={item.id} className="bg-mainLightGreen flex flex-col justify-center items-center rounded-2xl p-4 gap-2">
                        <item.icon size='65%' strokeWidth={1.5} />
                        <p className="text-sm w-full truncate text-center">
                            {item.name}
                        </p>
                    </div>
                ))}
            </div>
        </ContainerMain>
        </>
    )
}