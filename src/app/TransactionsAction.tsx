import { useEffect, useState } from "react";
import ButtonPrimary from "../components/ui/ButtonPrimary";
import ButtonSecondary from "../components/ui/ButtonSecondary";
import ContainerMain from "../components/ui/ContainerMain";
import ContainerTop from "../components/ui/ContainerTop";
import Header from "../components/ui/Header";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { useCategory } from "../hooks/useCategory";
import { TypeTransaction } from "../services/TransactionService";
import { useNavigate, useParams } from "react-router-dom";
import { useTransaction } from "../hooks/useTransaction ";
import { Trash } from "lucide-react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function TransactionsAction(){
    const { id } = useParams();
    const {dataUser} = useAuth();

    const idTransaction:number = id ? parseInt(id) : 0;
    const { createOrUpdate, getById, deleteTransaction } = useTransaction();
    const emptyData:TypeTransaction = {
                                        id: idTransaction, name: '',
                                        amount:0 , 
                                        date: new Date(new Date().toLocaleDateString('en-CA')), 
                                        categoryId:0, 
                                        categoryIcon: '', 
                                        userId: dataUser?.id ? dataUser.id : 0 
                                    };
    const [editData, setEditData] = useState<TypeTransaction>(emptyData);
    const [isExpense, setIsExpense] = useState<boolean>(false);

    const navigate = useNavigate();

    const { loadCategories, categories } = useCategory();
    const handleOptionSelectCategory = () => {
        return categories.map((item)=>({ value: item.id, label: item.name }))
    };

    // Função para lidar com a mudança no checkbox
    const handleCheckboxChange = (checked: boolean) => {
        setIsExpense(checked);
  
        setEditData((prev) => ({
            ...prev,
            amount: editData.amount * -1 ,
        }));
    };

    // Função para lidar com a mudança no input de valor
    const handleAmountChange = (value: number) => {

        setIsExpense(value < 0 ? true : isExpense);
        
        setEditData((prev) => ({
            ...prev,
            amount: isExpense && value > 0 ? value * -1 : value,
        }));
    };



     // Carregar para edição
    useEffect(() => {
    if (idTransaction) {
        const loadTransaction = async () => {
        const itemEdit = await getById(idTransaction);
        if (itemEdit) {
            setEditData(itemEdit);
            setIsExpense(itemEdit.amount < 0 ? true : false);
        }
        };
        loadTransaction();
    }
    }, [idTransaction]);

    useEffect(()=>{
        if(dataUser?.id){
            loadCategories(dataUser.id)
        }
    },[dataUser]);

     // Salvar ou atualizar
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editData?.name || !editData?.amount || !editData.categoryId) {
        alert("Por favor, preencha todos os campos!");
        return;
        }
        if(dataUser?.id){
            await createOrUpdate(editData, dataUser.id);
            navigate('/transactions');
        }else{
            toast.error("Erro ao Encontrar Usuário.")
        }
    };

    const handleSelectCategory = (value: number) => {
        const iconCategory = categories.find((item)=> item.id == value );
        setEditData((prev) => ({ ...prev, categoryId: value, categoryIcon: iconCategory?.icon ?  iconCategory.icon  : ''}));
    }

    const handleDelete = async () => {
        if(confirm('Tem certeza que deseja Excluir?')){
          await deleteTransaction(idTransaction!);
          navigate('/transactions');
        }
    }

    const handleData = (data:string) => {
        const [year, month, day] = data.split('-').map(Number);
        const localDate = new Date(year, month - 1, day); 
        setEditData((prev) => ({ ...prev, date: localDate }))
    }

    return(
        <>
        <ContainerTop>
            <Header title={idTransaction ? "Editar Transação" : "Adicionar Transação"} />
            
        </ContainerTop>
        <ContainerMain>
            {idTransaction > 0 && 
                <div className="flex justify-end items-center p-2" onClick={() => handleDelete()}>
                    <div className=" flex items-center text-sm gap-2 p-2 bg-rose-100 text-rose-900 rounded-xl">
                        <Trash /> Excluir
                    </div>
                </div>
            }
            <form onSubmit={handleSave}>
                <div className="flex flex-col gap-3">
                    <Input type="date" label="Data:" required 
                        value={editData.date ? new Date(editData.date).toISOString().split('T')[0] : ''} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleData(e.target.value)}   />
                    <Input label="Nome da Transação:" required
                        value={editData.name !== '' ? editData.name : ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditData((prev) => ({ ...prev, name: e.target.value }))} 
                    />
                    <div className="flex flex-col">
                        <label className="ml-3 text-mainFontBold/70">Categoria:</label>
                        <Select
                            options={handleOptionSelectCategory()} 
                            placeholder="Selecione uma Categoria"
                            selectedValue={editData.categoryId  ? editData.categoryId : 0}
                            onChange={handleSelectCategory}  />
                    </div>
                    
                    <div className="pt-3">
                        <label className="inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" value="" 
                                className="sr-only peer" 
                                checked={isExpense}
                                onChange={(e) => handleCheckboxChange(e.target.checked)}
                             />
                            <div className="relative w-11 h-6 ml-3 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500/80"></div>
                            <span className="ms-3 text-sm font-medium text-mainFontBold/70">Despesa?</span>
                        </label>
                    </div>

                    <Input type="number" label="Valor R$:" required 
                         value={editData.amount ? editData.amount : ''}
                         addClass={editData.amount < 0 ? 'text-2xl text-rose-500' : 'text-2xl'}
                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAmountChange(Number(e.target.value))}
                    />
                </div>
                
                <div className='flex flex-col justify-between items-center gap-3 mt-5'>
                    
                    <ButtonPrimary type="submit" wFull>
                        {idTransaction ? "Salvar" : "Adicionar"}
                    </ButtonPrimary>

                    <ButtonSecondary wFull  onClick={() => window.history.back()}>
                        Voltar
                    </ButtonSecondary>
                </div>
            </form>
        </ContainerMain>
        </>
    )
}