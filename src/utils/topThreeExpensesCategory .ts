import { TypeTransaction } from "../services/TransactionService";
import { TypeCategory } from "../services/CategoryService";

interface CategoryExpense {
  name: string;
  icon: string;
  total: number;
  percentage: number;
}

export const topThreeExpensesCategory = (
    transactions: TypeTransaction[] | undefined,
    categories: TypeCategory[]
  ): CategoryExpense[] => {

    if(!transactions) 
      return [];
    
    // Filtrar apenas despesas (valores negativos)
    const negativeTransactions = transactions.filter(
      (transaction) => transaction.amount < 0
    );
  
    // Agrupar e somar despesas por categoria
    const expensesByCategory = negativeTransactions.reduce<Record<number, number>>(
      (acc, transaction) => {
        acc[transaction.categoryId] =
          (acc[transaction.categoryId] || 0) + transaction.amount;
        return acc;
      },
      {}
    );
  
    const totalPositive = transactions
      .filter((transaction) => transaction.amount >= 0)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  
    // Criar lista de despesas com informações das categorias
    const categoryExpenses: CategoryExpense[] = Object.entries(
      expensesByCategory
    ).map(([categoryId, total]) => {
      const category = categories.find((cat) => cat.id === parseInt(categoryId));
      if (category) {
        return {
          name: category.name,
          icon: category.icon,
          total: total,
          percentage: Math.round(Math.abs((total / totalPositive) * 100)), // Arredonda a porcentagem para o inteiro mais próximo
        };
      }
      return null as unknown as CategoryExpense;
    }).filter(Boolean); // Remover itens nulos
  
    // Ordenar pela maior despesa e pegar as 3 primeiras
    return categoryExpenses
      .sort((a, b) => a.total - b.total)
      .slice(0, 3);
      
  };
  