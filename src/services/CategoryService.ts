import { IDBPDatabase } from 'idb';
import { initDB, TAB_CATEGORY, TAB_TRANSACTION } from './dbService';

export interface TypeCategoryNew {
  name: string;
  icon: string;
}

export interface TypeCategory extends TypeCategoryNew {
  id: number;
}

// Categorias padrão
const DEFAULT_CATEGORIES: TypeCategoryNew[] = [
  { name: 'Salário', icon: 'DollarSign' },
  { name: 'Casa', icon: 'Home' },
  { name: 'Transporte', icon: 'Car' },
  { name: 'Alimentação', icon: 'Utensils' },
  { name: 'Mercado', icon: 'ShoppingCart' },
  { name: 'Fixa', icon: 'HandCoins' },
  { name: 'Fornecedor', icon: 'Box' }
];

class CategoryService {
  
  private db:IDBPDatabase<unknown> | null = null; 
  private seedExecuted = false;

  constructor() {}

  // Inicializar o banco de dados
  private async initialize(): Promise<void> {
    if (!this.db) {
      this.db = await initDB();
      await this.seedDefaultCategories();
    }
  }

  // Verificar e adicionar categorias padrão
  private async seedDefaultCategories(): Promise<void> {

    if (this.seedExecuted)  return;

    this.seedExecuted = true; // Marca como executado
    const allCategories = await this.listAll();

    // Adicionar categorias padrão apenas se o banco estiver vazio
    if (allCategories.length === 0) {
      const db = this.validateDB();
      const tx = db.transaction(TAB_CATEGORY, 'readwrite');
      const store = tx.objectStore(TAB_CATEGORY);

      for (const category of DEFAULT_CATEGORIES) {
        await store.add(category);
      }

      await tx.done;
    }
  }

  // Validar se o banco foi inicializado
  private validateDB(): IDBPDatabase<unknown> {
    if (!this.db) {
      throw new Error('Banco de dados não inicializado.');
    }
    return this.db;
  }

  // Buscar todas as categorias
  public async listAll(): Promise<TypeCategory[]> {
      await this.initialize();
      const db = this.validateDB();
      const tx = db.transaction(TAB_CATEGORY, 'readonly');
      const store = tx.objectStore(TAB_CATEGORY);
      return await store.getAll();
  }

  // Buscar Categoria por Id
  public async getById(id:number):Promise<TypeCategory | undefined>{
      await this.initialize();
      const db = this.validateDB();
      const tx = db.transaction(TAB_CATEGORY, 'readonly');
      const store = tx.objectStore(TAB_CATEGORY);
      return await store.get(id);
  };

  // Buscar por nome
  public async getByName(name:string):Promise<TypeCategory | undefined>{
    await this.initialize();
    const db = this.validateDB();
    const tx = db.transaction(TAB_CATEGORY, 'readonly');
    const store = tx.objectStore(TAB_CATEGORY);
    
    let cursor = await store.openCursor();
    while (cursor) {
      const category = cursor.value as TypeCategory;
      if (category.name === name) {
        return category; // Retorna a categoria encontrada
      }
      cursor = await cursor.continue(); // Move o cursor para o próximo item
    }
  
    return undefined; 
    
  };

  //Add Category
  public async insert(category: TypeCategoryNew): Promise<void> {
      await this.initialize();

      // Verificar se já existe uma categoria com o mesmo nome
      const existingCategory = await this.getByName(category.name);
      if (existingCategory) {
        throw new Error(`Categoria com o nome "${category.name}" já existe.`);
      }

      const db = this.validateDB();
      const tx = db.transaction(TAB_CATEGORY, 'readwrite');
      const store = tx.objectStore(TAB_CATEGORY);
      await store.add(category);
      await tx.done;
  };

  // Atualizar uma categoria
  public async update(category: TypeCategory): Promise<void>{
    if (!category.id) {
      throw new Error('ID da categoria é necessário para atualização.');
    }
    await this.initialize();
    const db = this.validateDB();
    const tx = db.transaction(TAB_CATEGORY, 'readwrite');
    const store = tx.objectStore(TAB_CATEGORY);
    await store.put(category);
    await tx.done;
  };

  // Excluir uma categoria
  public async delete(id: number): Promise<void> {
    if(id <= 5 ) throw new Error('Categoria Padrão não pode ser excluida!')
    await this.initialize();
    const db = this.validateDB();

    // Verificar se existem transações associadas à categoria
    const txTransaction = db.transaction(TAB_TRANSACTION, 'readonly');
    const storeTransaction = txTransaction.objectStore(TAB_TRANSACTION);
    const indexTransaction = storeTransaction.index('categoryId'); 
    
    const relatedTransaction = await indexTransaction.get(id); 
    if (relatedTransaction) {
      throw new Error('Não é possível excluir a categoria, pois ela está associada a uma ou mais transações.');
    }
    
    const tx = db.transaction(TAB_CATEGORY, 'readwrite');
    const store = tx.objectStore(TAB_CATEGORY);
    await store.delete(id);
    await tx.done;
  }  

}


export default CategoryService;