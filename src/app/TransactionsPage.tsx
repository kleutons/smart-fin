import { useEffect, useState } from "react";
import ContainerMain from "../components/ui/ContainerMain";
import ContainerTop from "../components/ui/ContainerTop";
import Header from "../components/ui/Header";
import Select from "../components/ui/Select";
import { ArrowDownRight, ArrowUpRight, Plus } from "lucide-react";
import ButtonPrimary from "../components/ui/ButtonPrimary";
import { useNavigate } from "react-router";
import { useTransaction } from "../hooks/useTransaction ";
import { months } from "../utils/months";
import { generateYears } from "../utils/years";
import { Toaster } from "react-hot-toast";
import { IconCategory } from "../utils/IconsCategory";
import { useCategory } from "../hooks/useCategory";
import { calculateSummary } from "../utils/calculateSummary";


export default function TransactionsPage(){

    const { loadByMonth, transactions } = useTransaction();
    const { categories } = useCategory();

    const idIcon = categories.reduce<Record<number, string>>((acc, item) => {
        acc[item.id] = item.icon;
        return acc;
    }, {});
    
    
    const [month, setMonth] = useState<number>(3);
    const [year, setYear]   = useState<number>(2025);

    const navigate = useNavigate();

    const handleSelectMonth = (value: number) => {
        setMonth(value);
    };

    const handleSelectYear = (value: number) => {
        setYear(value);
    }

    useEffect(() => {
        loadByMonth(month, year); // Carregar transações de março de 2025
    }, [month, year]);

    // Função para renderizar o ícone com base no nome salvo
    const renderIcon = (categoryId: number) => {
        const iconName = idIcon[categoryId];
        const icon = IconCategory.find((item) => item.name.toLowerCase() === iconName.toLowerCase());
        return icon ? <icon.icon size={40} strokeWidth={1.5} className="bg-mainGreen/20 rounded-lg p-2" />: null; 
    };

    // Exemplo de Uso
    const { saldo, despesas } = calculateSummary(transactions);
    const percentage = saldo > 0 ? (Math.abs(despesas) / saldo) * 100 : 0;


    return(
        <>
        <Toaster/>

        <ContainerTop>
            <Header title="Transações" />

            <div className="flex flex-col gap-6 mt-4">
            
                <div className="flex gap-4 justify-between items-center text-mainFontBold">
                    <div className="flex-1 flex flex-col items-center bg-mainWhite rounded-2xl p-4">
                        <ArrowUpRight size={30} strokeWidth={1.5} />
                        <p className="text-sm">Entrada:</p>
                        <p className="font-semibold text-emerald-600">
                            {saldo.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                        </p>
                    </div>
                    <div className="flex-1 flex flex-col items-center bg-mainWhite rounded-2xl p-4">
                        <ArrowDownRight size={30} strokeWidth={1.5} />
                        <p className="text-sm">Despesas:</p>
                        <p className="font-semibold text-rose-600">
                            {despesas.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                        </p>
                    </div>
                </div>

                <div className="bg-mainLightGreen rounded-2xl flex justify-end">
                    <span
                        className="bg-mainFontBold flex justify-center items-center rounded-2xl"
                        style={{ width: `${percentage}%` }}
                    >
                        {percentage.toFixed(0)}%
                    </span>
                </div>
            </div>

        </ContainerTop>
        <ContainerMain>
            <div className="flex gap-3 justify-between items-center pb-4 mb-4 border-b border-mainFontBold/20 ">
                <Select options={months} addClass="w-2/3" selectedValue={month} onChange={handleSelectMonth} />
                <Select options={generateYears()} addClass="w-1/3" selectedValue={year} onChange={handleSelectYear} />
            </div>
            <div className="fixed bottom-20 right-4 opacity-80 hover:opacity-100">
                <ButtonPrimary onClick={()=>navigate('/transactions/action')}>
                    <Plus size={24}  />
                </ButtonPrimary>
            </div>
            <div className="mb-8 flex flex-col gap-3">
                {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex gap-4 justify-between items-center rounded-2xl p-4 bg-mainLightGreen/40" 
                    onClick={()=>navigate(`/transactions/action/${transaction.id}`)}
                    >
                        <div className="flex flex-1 gap-2 justify-center items-center">
  
                            {renderIcon(transaction.categoryId)}

                            <div className="flex-1">
                                <p className="text-lg">{transaction.name}</p>
                                <p className="text-sm">{new Date(transaction.date).toLocaleDateString("pt-BR")}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className={`${transaction.amount >= 0 ? 'text-emerald-700' : "text-rose-700"}`}>
                                {transaction.amount.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}
                            </p>
                        </div>
                    </div>  
                ))}
            </div>
        </ContainerMain>
        </>
    )
}