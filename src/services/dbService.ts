import { openDB, IDBPDatabase } from 'idb';

export const dbName = 'SmartFinDB';
export const TAB_CATEGORY = 'category';
export const TAB_TRANSACTION = 'transaction';

// Inicializar o banco de dados
export const initDB = async (): Promise<IDBPDatabase> => {
  return openDB(dbName, 2, { // Versão 2
    upgrade(db, oldVersion, newVersion, transaction) {
      console.log(`Atualizando banco de versão ${oldVersion} para ${newVersion}`);

      // Criar tabela de categorias, se não existir
      // `id` chave primária
      if (!db.objectStoreNames.contains(TAB_CATEGORY)) {
        db.createObjectStore(TAB_CATEGORY, { keyPath: 'id', autoIncrement: true });
      }

      // Criar tabela de transações, se não existir
      if (!db.objectStoreNames.contains(TAB_TRANSACTION)) {
         // `id` chave primária
        const transactionStore = db.createObjectStore(TAB_TRANSACTION, {
          keyPath: 'id',
          autoIncrement: true,
        });

        // Criar índice para correlação `categoryId`
        transactionStore.createIndex('categoryId', 'categoryId', { unique: false });

        // Criar índice para `data` (data da transação)
        transactionStore.createIndex('date', 'date', { unique: false });
      }

      // Atualizações posteriores podem ser gerenciadas com base em `oldVersion` e `newVersion`
      if (oldVersion < 2) {
        const transactionStore = transaction.objectStore(TAB_TRANSACTION);

        // Certifique-se de adicionar o índice `data` 
        if (!transactionStore.indexNames.contains('date')) {
          transactionStore.createIndex('date', 'date', { unique: false });
        }
      }
    },
  });
};
