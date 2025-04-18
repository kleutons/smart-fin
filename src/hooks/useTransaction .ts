import toast from "react-hot-toast";
import TransactionService, { TypeTransaction } from "../services/TransactionService";
import { useState } from "react";

export const useTransaction  = () => {

    const [transactions, setTransactions] = useState<TypeTransaction[] | undefined>(undefined);
    const service = new TransactionService();

    // Carregar 
    const loadByMonth = async (month: number, year: number, userId: number) => {
        try {
        const result = await service.listByMonth(month, year, userId);
        setTransactions(result);
        } catch (error) {
        console.error('Erro ao carregar transações:', error);
        toast.error('Erro ao carregar transações.');
        }
    };

    // Criar ou atualizar transações
    const createOrUpdate = async (transaction: TypeTransaction, userId: number) => {
        try {
            if (transaction.id === undefined || transaction.id == 0) {                
                await service.insert({
                    name: transaction.name, 
                    amount: transaction.amount,
                    date: transaction.date,
                    categoryId: transaction.categoryId,
                    categoryIcon: transaction.categoryIcon,
                    userId
                });
                toast.success('Cadastrado com sucesso!');
            } else {
                await service.update(transaction);
                toast.success('Atualizado com sucesso!');
            }
        } catch (error) {
        console.error('Erro ao salvar a transação:', error);
        toast.error('Erro ao salvar a transação.');
        }
    };


    // Buscar por ID
    const getById = async (id: number): Promise<TypeTransaction | undefined> => {
        try {
        return await service.getById(id);
        } catch (error) {
        console.error(`Erro ao buscar transação com ID ${id}:`, error);
        toast.error('Erro ao buscar a transação.');
        return undefined;
        }
    };

    // Deletar transação
    const deleteTransaction = async (id: number) => {
        try {
            await service.delete(id);
            toast.success('Transação excluída com sucesso!');
            setTransactions((prev = []) => prev.filter((item) => item.id !== id)); 
        } catch (error) {
            console.error(`Erro ao excluir transação com ID ${id}:`, error);
            toast.error('Erro ao excluir a transação: ' + error);
        }
    };

    
    return {
        loadByMonth,
        transactions,
        createOrUpdate,
        getById,
        deleteTransaction,
    };
}