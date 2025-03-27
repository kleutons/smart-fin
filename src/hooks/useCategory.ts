import { useState } from 'react';
import toast from 'react-hot-toast';
import CategoryService, { TypeCategory } from '../services/CategoryService';


export const useCategory = () => {
  const [categories, setCategories] = useState<TypeCategory[]>([]);
  const service = new CategoryService();

  // Carregar categorias
  const loadCategories = async (userId:number) => {
    try {
      const result = await service.listAllByUserId(userId);
      setCategories(result);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      toast.error('Erro ao carregar categorias.');
    }
  };

  
  // Criar ou atualizar categoria
  const createOrUpdate = async (category: TypeCategory, userId: number) => {
      try {
        if (category.id === undefined || category.id == 0) {
          await service.insert({name: category.name, icon: category.icon, userId: userId});
          toast.success('Categoria cadastrada com sucesso!');
        } else {
          await service.update(category);
          toast.success('Categoria atualizada com sucesso!');
        }
        await loadCategories(userId); // Atualiza a lista após a operação
      } catch (error) {
        console.error('Erro ao salvar a categoria:', error);
        toast.error('Erro ao salvar a categoria.');
      }
   
  };

  // Buscar categoria por ID
  const getById = async (id: number): Promise<TypeCategory | undefined> => {
    try {
      return await service.getById(id);
    } catch (error) {
      console.error(`Erro ao buscar categoria com ID ${id}:`, error);
      toast.error('Erro ao buscar a categoria.');
      return undefined;
    }
  };

  // Deletar categoria
  const deleteCategory = async (id: number) => {
    try {
      await service.delete(id);
      toast.success('Categoria excluída com sucesso!');
      setCategories((prev) => prev.filter((category) => category.id !== id)); // Atualiza o estado local
    } catch (error) {
      console.error(`Erro ao excluir categoria com ID ${id}:`, error);
      toast.error('Erro ao excluir a categoria: ' + error);
    }
  };

  return {
    loadCategories,
    categories,
    createOrUpdate,
    getById,
    deleteCategory,
  };
};
