import { IDBPDatabase } from 'idb';
import { initDB, TAB_USER } from './dbService';
import generateHash from '../utils/generateHash';

export interface TypeUserNew {
  name: string;
  email: string;
  password: string;
  urlImage?: string;
}

export interface TypeUserReturn {
  id?:number;
  name: string;
  email: string;
  urlImage?: string;
}

export interface TypeUser extends TypeUserNew {
  id: number;
}

export const NewUserDefault:TypeUser = {
  id: 1,
  name: 'Usuário',
  email: 'usuario@email.comm',
  password: '123456'
};

class UserService {
  
  private db:IDBPDatabase<unknown> | null = null; 
  private seedExecuted = false;

  constructor() {
    this.initialize();
  }

  // Inicializar o banco de dados
  private async initialize(): Promise<void> {
    if (!this.db) {
      this.db = await initDB();
      await this.seedDefaultUser();
    }
  }

 // Verificar e adicionar usario padrão
  private async seedDefaultUser(): Promise<void> {

        if (this.seedExecuted)  return;

        this.seedExecuted = true; // Marca como executado
        const allUser = await this.listAll();

        // Adicionar usuario padrão apenas se o banco estiver vazio
        if (allUser.length === 0) {
            try{
              await this.insert(NewUserDefault);
            }catch(error){
              console.log(error);
            }
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
  public async listAll(): Promise<TypeUser[]> {
      await this.initialize();
      const db = this.validateDB();
      const tx = db.transaction(TAB_USER, 'readonly');
      const store = tx.objectStore(TAB_USER);
      return await store.getAll();
  }

  // Buscar Usuario por Id
  public async getById(id:number):Promise<TypeUser | undefined>{
      await this.initialize();
      const db = this.validateDB();
      const tx = db.transaction(TAB_USER, 'readonly');
      const store = tx.objectStore(TAB_USER);
      return await store.get(id);
  };

  // Buscar por Email
  public async getByEmail(email:string):Promise<TypeUser | undefined>{
    await this.initialize();
    const db = this.validateDB();
    const tx = db.transaction(TAB_USER, 'readonly');
    const store = tx.objectStore(TAB_USER);
    
    let cursor = await store.openCursor();
    while (cursor) {
      const user = cursor.value as TypeUser;
      if (user.email === email) {
        return user; // Retorna a categoria encontrada
      }
      cursor = await cursor.continue(); // Move o cursor para o próximo item
    }
    return undefined; 
  };

  //Add User
  public async insert(user: TypeUserNew, isHasPass:boolean = true): Promise<void> {
      await this.initialize();

      // Verificar se já existe uma usuario com o mesmo email
      const isExisting = await this.getByEmail(user.email);
      if (isExisting) {
        throw new Error(`Usuário já existe, faça o login!`);
      }


      //Check se é usuario padrão para atualizar o mesmo  
      const userDefault = await this.getById(1);


      if(userDefault?.name === NewUserDefault.name  && userDefault?.email === NewUserDefault.email ){
          this.update({id:1, name:user.name, email: user.email, password: user.password});
          return;
      }

      if(isHasPass){
        // Gerar o hash da senha
        user.password = await generateHash(user.password);
      }

      const db = this.validateDB();      
      const tx = db.transaction(TAB_USER, 'readwrite');
      const store = tx.objectStore(TAB_USER);
      await store.add(user);
      await tx.done;
  };

  // Atualizar Usuário
  public async update(user: TypeUser, isHasPass:boolean = true): Promise<void>{
    if (!user.id) {
      throw new Error('ID do usuário é necessário para atualização.');
    }
    
    if(isHasPass){
      // Gerar o hash da senha
      user.password = await generateHash(user.password);
    }

    await this.initialize();
    const db = this.validateDB();
    const tx = db.transaction(TAB_USER, 'readwrite');
    const store = tx.objectStore(TAB_USER);
    await store.put(user);
    await tx.done;
  };


}


export default UserService;