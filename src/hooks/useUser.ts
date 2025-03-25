import toast from "react-hot-toast";
import UserService, { TypeUser, TypeUserReturn } from "../services/UserService";

export const useUser  = () => {

    const service = new UserService();

    // Criar ou atualizar usuario
    const createOrUpdate = async (user: TypeUser, isHasPass:boolean = true):Promise<TypeUserReturn | undefined> => {

        if(user.password.length < 6 ){
            toast.error('A senha deve conter no mínimo 6 caracteres!');
            return;
        } 

        try {
            if (user.id === undefined || user.id == 0) {                
                await service.insert({
                    name: user.name, 
                    email: user.email,
                    password: user.password
                }, isHasPass);
                toast.success('Conta Criada com Sucesso!');
                return {name: user.name, email: user.email};
            } else {
                await service.update(user, isHasPass);
                toast.success('Atualizado com sucesso!');
                return {name: user.name, email: user.email};
            }
        } catch (error) {
            console.error('Erro ao salvar:', error);
            toast.error('' + error);
            return undefined;
        }
    };


    // Buscar por ID
    const getById = async (id: number): Promise<TypeUserReturn | undefined> => {
        try {
        return await service.getById(id);
        } catch (error) {
        console.error(`Erro ao buscar usuário com ID ${id}:`, error);
        toast.error('Erro ao buscar usuário.');
        return undefined;
        }
    };
    
    const getByEmail = async (email: string): Promise<TypeUser | undefined> => {
        try {
            return await service.getByEmail(email);
        } catch (error) {
            console.error(`Erro ao buscar usuário:`, error); 
            toast.error('Erro ao buscar usuário.');
            return undefined;
        }
    };
    

    return {
        createOrUpdate,
        getById,
        getByEmail
    };
}