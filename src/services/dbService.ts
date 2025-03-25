import { openDB, IDBPDatabase } from 'idb';

export const dbName = 'SmartFinDB';
export const TAB_USER = 'user';
export const TAB_CATEGORY = 'category';
export const TAB_TRANSACTION = 'transaction';

// Inicializar o banco de dados
export const initDB = async (): Promise<IDBPDatabase> => {
  return openDB(dbName, 3, { // Versão 2
    upgrade(db, oldVersion, newVersion, transaction) {
      console.log(`Atualizando banco de versão ${oldVersion} para ${newVersion}`);


      // Criar tabela de user, se não existir
      if (!db.objectStoreNames.contains(TAB_USER)) {
        db.createObjectStore(TAB_USER, { keyPath: 'id', autoIncrement: true });
      }

      // Criar tabela de categorias, se não existir
      if (!db.objectStoreNames.contains(TAB_CATEGORY)) {
        const categoryStore = db.createObjectStore(TAB_CATEGORY, { keyPath: 'id', autoIncrement: true });

        // Criar índice para correlação `userId`
        categoryStore.createIndex('userId', 'userId', { unique: false });
      }

      // Criar tabela de transações, se não existir
      if (!db.objectStoreNames.contains(TAB_TRANSACTION)) {
        const transactionStore = db.createObjectStore(TAB_TRANSACTION, {keyPath: 'id', autoIncrement: true});

        // Criar índice para correlação `userId`
        transactionStore.createIndex('userId', 'userId', { unique: false });

        // Criar índice para correlação `categoryId`
        transactionStore.createIndex('categoryId', 'categoryId', { unique: false });

        // Criar índice para `data` (data da transação)
        transactionStore.createIndex('date', 'date', { unique: false });
      }

      // Atualizações posteriores podem ser gerenciadas com base em `oldVersion` e `newVersion`
      if (oldVersion < 3) {
        const transactionStore = transaction.objectStore(TAB_TRANSACTION);

        // Certifique-se de adicionar o índice `data` 
        if (!transactionStore.indexNames.contains('date')) {
          transactionStore.createIndex('date', 'date', { unique: false });
        }
      }
    },
  });
};
