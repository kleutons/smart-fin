import { TypeTransaction } from "../services/TransactionService";

// Tipagem para o Resumo
interface Summary {
    saldo: number;
    despesas: number;
}

export const calculateSummary = (transactions: TypeTransaction[]): Summary => {
    const summary = transactions.reduce<Summary>(
        (acc, transaction) => {
            if (transaction.amount >= 0) {
                acc.saldo += transaction.amount;
            } else {
                acc.despesas += transaction.amount;
            }
            return acc;
        },
        { saldo: 0, despesas: 0 } // Valores iniciais
    );

    return summary;
};