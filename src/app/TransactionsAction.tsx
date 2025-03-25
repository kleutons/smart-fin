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

export default function TransactionsAction(){
    const { id } = useParams();
    const idTransaction:number = id ? parseInt(id) : 0;
    const { createOrUpdate, getById, deleteTransaction } = useTransaction();
    const emptyData:TypeTransaction = {id: idTransaction, name: '', categoryId:0, amount:0 , date: new Date(new Date().toLocaleDateString('en-CA')) };
    const [editData, setEditData] = useState<TypeTransaction>(emptyData);

    const navigate = useNavigate();

    const { categories } = useCategory();
    const handleOptionSelectCategory = () => {
        return categories.map((item)=>({ value: item.id, label: item.name }))
    };

    
     // Carregar para edição
    useEffect(() => {
    if (idTransaction) {
        const loadTransaction = async () => {
        const itemEdit = await getById(idTransaction);
        if (itemEdit) {
            setEditData(itemEdit);
        }
        };
        loadTransaction();
    }
    }, [idTransaction]);

     // Salvar ou atualizar
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editData?.name || !editData?.amount || !editData.categoryId) {
        alert("Por favor, preencha todos os campos!");
        return;
        }
        await createOrUpdate(editData);
        navigate('/transactions');
    };

    const handleSelectCategory = (value: number) => {
        setEditData((prev) => ({ ...prev, categoryId: value }));
    }

    const handleDelete = async () => {
        if(confirm('Tem certeza que deseja Excluir?')){
          await deleteTransaction(idTransaction!);
          navigate('/transactions');
        }
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            setEditData((prev) => ({ ...prev, date: new Date(e.target.value) }))
                        }   />
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
                    <Input type="number" label="Valor:" required 
                         value={editData.amount ? editData.amount : ''}
                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditData((prev) => ({ ...prev, amount: parseFloat(e.target.value) }))}
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