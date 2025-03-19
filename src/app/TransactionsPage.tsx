import { useState } from "react";
import ContainerMain from "../components/ui/ContainerMain";
import ContainerTop from "../components/ui/ContainerTop";
import Header from "../components/ui/Header";
import Select from "../components/ui/Select";
import { ArrowDownRight, ArrowUpRight, DollarSign, Plus } from "lucide-react";
import ButtonPrimary from "../components/ui/ButtonPrimary";
import { useNavigate } from "react-router";

const optionsMonth = [
    {value: "1", label: "Janeiro"},
    {value: "2", label: "Fevereiro"},
    {value: "3", label: "Março"},
    {value: "4", label: "Abril"},
    {value: "5", label: "Maio"},
    {value: "6", label: "Junho"},
    {value: "7", label: "Julho"},
    {value: "8", label: "Agosto"},
    {value: "9", label: "Setembro"},
    {value: "10", label: "Outubro"},
    {value: "11", label: "Novembro"},
    {value: "12", label: "Dezembro"}
];

const optionsYear = [
    {value: "2023", label: "2023"},
    {value: "2024", label: "2024"},
    {value: "2025", label: "2025"}
];

const transactions = [
    {
        id: 1,
        date: "2025-03-01",
        title: "Salário",
        value: 1000.00,
        category: "Salário",
    },
    {
        id: 2,
        date: "2025-03-01",
        title: "Aluguel",
        value: -500.00,
        category: "Moradia",
    },
    {
        id: 3,
        date: "2025-03-01",
        title: "Mercado",
        value: -200,
        category: "Alimentação",
    },
    {
        id: 1,
        date: "2025-03-01",
        title: "Salário",
        value: 1000.00,
        category: "Salário",
    },
    {
        id: 2,
        date: "2025-03-01",
        title: "Aluguel",
        value: -500.00,
        category: "Moradia",
    },
    {
        id: 3,
        date: "2025-03-01",
        title: "Mercado",
        value: -200,
        category: "Alimentação",
    },
    {
        id: 1,
        date: "2025-03-01",
        title: "Salário",
        value: 1000.00,
        category: "Salário",
    },
    {
        id: 2,
        date: "2025-03-01",
        title: "Aluguel",
        value: -500.00,
        category: "Moradia",
    },
    {
        id: 3,
        date: "2025-03-01",
        title: "Mercado",
        value: -200,
        category: "Alimentação",
    }
];

export default function TransactionsPage(){

    const [month, setMonth] = useState<string | undefined>("3");
    const [year, setYear]   = useState<string | undefined>("2025");

    const navigate = useNavigate();

    const handleSelectMonth = (value: string) => {
        setMonth(value);
        console.log("Valor selecionado:", value);
    };

    const handleSelectYear = (value: string) => {
        setYear(value);
        console.log("Valor selecionado:", value);
    }

    return(
        <>
        <ContainerTop>
            <Header title="Transações" />

            <div className="flex flex-col gap-6 mt-4">
            
                <div className="flex gap-4 justify-between items-center text-mainFontBold">
                    <div className="flex-1 flex flex-col items-center bg-mainWhite rounded-2xl p-4">
                        <ArrowUpRight size={30} strokeWidth={1.5} />
                        <p className="text-sm">Saldo:</p>
                        <p className="font-semibold text-emerald-600">R$ 100,00</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center bg-mainWhite rounded-2xl p-4">
                        <ArrowDownRight size={30} strokeWidth={1.5} />
                        <p className="text-sm">Despesas:</p>
                        <p className="font-semibold text-rose-600">R$ -10.000,00</p>
                    </div>
                </div>

                <div className="bg-mainLightGreen rounded-2xl flex justify-end">
                    <span className="bg-mainFontBold flex justify-center items-center rounded-2xl w-[80%]">80%</span>
                </div>
            </div>

        </ContainerTop>
        <ContainerMain>
            <div className="flex gap-3 justify-between items-center pb-4 mb-4 border-b border-mainFontBold/20 ">
                <Select options={optionsMonth} addClass="w-2/3" selectedValue={month} onChange={handleSelectMonth} />
                <Select options={optionsYear} addClass="w-1/3" selectedValue={year} onChange={handleSelectYear} />
            </div>
            <div className="fixed bottom-20 right-4 opacity-80 hover:opacity-100">
                <ButtonPrimary onClick={()=>navigate('/transactions/action')}>
                    <Plus size={24}  />
                </ButtonPrimary>
            </div>
            <div className="mb-8 flex flex-col gap-3">
                {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex gap-4 justify-between items-center rounded-2xl p-4 bg-mainLightGreen/40">
                        <div className="flex flex-1 gap-2 justify-center items-center">
                            <DollarSign size={40} strokeWidth={1.5} className="bg-mainGreen/20 rounded-lg p-2" />
                            <div className="flex-1">
                                <p className="text-lg">{transaction.title}</p>
                                <p className="text-sm">{transaction.date}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className={`${transaction.value >= 0 ? 'text-emerald-700' : "text-rose-700"}`}>
                                {transaction.value.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}
                            </p>
                        </div>
                    </div>  
                ))}
            </div>
        </ContainerMain>
        </>
    )
}