import { IDBPDatabase } from "idb";
import { initDB, TAB_TRANSACTION } from "./dbService";

export interface TypeTransactionNew {
  name: string;
  amount: number;
  date: Date;
  categoryId: number;
  categoryIcon:string;
  userId: number;
}

export interface TypeTransaction extends TypeTransactionNew {
  id: number;
}


class TransactionService {

  private db:IDBPDatabase<unknown> | null = null;

  constructor() {}

  // Inicializar o banco de dados
  private async initialize(): Promise<void> {
    if (!this.db) {
      this.db = await initDB();
    }
  }

  // Validar se o banco foi inicializado
  private validateDB(): IDBPDatabase<unknown> {
    if (!this.db) {
      throw new Error('Banco de dados não inicializado.');
    }
    return this.db;
  }

  // Listar todas as transações
  public async listAll(): Promise<TypeTransaction[]> {
    await this.initialize();
    const db = this.validateDB();
    const tx = db.transaction(TAB_TRANSACTION, 'readonly');
    const store = tx.objectStore(TAB_TRANSACTION);
    return await store.getAll();
  }

  // Listar transações por mês e ano
  public async listByMonth(month: number, year: number, userId:number): Promise<TypeTransaction[]> {
    await this.initialize();
    const db = this.validateDB();
    const tx = db.transaction(TAB_TRANSACTION, 'readonly');
    const store = tx.objectStore(TAB_TRANSACTION);
    const index = store.index('date');
  
    // Criar intervalo de busca para o mês e ano fornecidos
    const startDate = new Date(year, month - 1, 1); // Primeiro dia do mês
    const endDate = new Date(year, month, 0); // Último dia do mês
    const range = IDBKeyRange.bound(startDate, endDate, false, false); // Intervalo de datas

    let cursor = await index.openCursor(range);
    const transactions: TypeTransaction[] = [];
    while (cursor) {
      if(cursor.value.userId == userId){
        transactions.push(cursor.value);
      }
      cursor = await cursor.continue();
    }
  
    return transactions;
  }
  
  // Buscar transação por ID
  public async getById(id: number): Promise<TypeTransaction | undefined> {
    await this.initialize();
    const db = this.validateDB();
    const tx = db.transaction(TAB_TRANSACTION, 'readonly');
    const store = tx.objectStore(TAB_TRANSACTION);
    return await store.get(id);
  }

  // Inserir uma nova transação
  public async insert(transaction: TypeTransactionNew): Promise<void> {
    await this.initialize();
    const db = this.validateDB();
    const tx = db.transaction(TAB_TRANSACTION, 'readwrite');
    const store = tx.objectStore(TAB_TRANSACTION);
    
    await store.add(transaction);
    await tx.done;
  }

  // Atualizar uma transação existente
  public async update(transaction: TypeTransaction): Promise<void> {
    if (!transaction.id) {
      throw new Error('ID da transação é necessário para atualização.');
    }

    await this.initialize();
    const db = this.validateDB();
    const tx = db.transaction(TAB_TRANSACTION, 'readwrite');
    const store = tx.objectStore(TAB_TRANSACTION);

    await store.put(transaction);
    await tx.done;
  }

  // Excluir uma transação
  public async delete(id: number): Promise<void> {
    await this.initialize();
    const db = this.validateDB();
    const tx = db.transaction(TAB_TRANSACTION, 'readwrite');
    const store = tx.objectStore(TAB_TRANSACTION);

    await store.delete(id);
    await tx.done;
  }

}

export default TransactionService;