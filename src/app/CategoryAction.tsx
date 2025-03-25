import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonPrimary from "../components/ui/ButtonPrimary";
import ButtonSecondary from "../components/ui/ButtonSecondary";
import ContainerMain from "../components/ui/ContainerMain";
import ContainerTop from "../components/ui/ContainerTop";
import Header from "../components/ui/Header";
import Input from "../components/ui/Input";
import { IconCategory } from "../utils/IconsCategory";
import { useCategory } from "../hooks/useCategory";
import { TypeCategory } from "../services/CategoryService";
import { Trash } from "lucide-react";


export default function CategoryAction() {
  const { id } = useParams();
  const idCategory:number = id ? parseInt(id) : 0;
  const isEditing = id !== undefined;
  const { createOrUpdate, getById, deleteCategory } = useCategory();

  const navigate = useNavigate();

  const emptyCategory:TypeCategory = {id: idCategory, name: '', icon: '', idUser: 1};
  const [categoryData, setCategoryData] = useState<TypeCategory>(emptyCategory);

  // Carregar a categoria para edição
  useEffect(() => {
    if (idCategory) {
      const loadCategory = async () => {
        const categoryEdit = await getById(idCategory);
        if (categoryEdit) {
          setCategoryData(categoryEdit);
        }
      };
      loadCategory();
    }
  }, [idCategory]);
  
  // Salvar ou atualizar a categoria
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryData.name) {
      alert("Por favor, preencha o nome da categoria!");
      return;
    }

    if (!categoryData.icon) {
      alert("Por favor, selecione um ícone!");
      return;
    }
    await createOrUpdate(categoryData);
    navigate('/categories');
  };

  
  const handleDelete = async () => {
    if(confirm('Tem certeza que deseja Excluir?')){
      await deleteCategory(idCategory!);
      navigate('/categories');
    }
  }

  return (
    <>
      <ContainerTop>
        <Header title={isEditing ? "Editar Categoria" : "Adicionar Categoria"} />
      </ContainerTop>
      <ContainerMain>
        {idCategory > 0 && 
                <div className="flex justify-end items-center p-2" onClick={() => handleDelete()}>
                    <div className=" flex items-center text-sm gap-2 p-2 bg-rose-100 text-rose-900 rounded-xl">
                        <Trash /> Excluir
                    </div>
                </div>
            }
        <form onSubmit={handleSave}>
          <Input 
            label="Nome da categoria:" 
            value={categoryData.name} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryData((prev) => ({ ...prev, name: e.target.value }))} 
            required
          />

          <div className="mt-4">
            <label className="ml-3 text-mainFontBold/70">Selecione o ícone:</label>
            <div className="mt-1 flex flex-wrap gap-2 justify-between">
              {IconCategory.map((item, index) => (
                <label
                  key={index}
                  className={`flex items-center p-2 rounded cursor-pointer ${
                    categoryData.icon === item.name ? "bg-mainGreen/30" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={categoryData.icon === item.name}
                    onChange={() => 
                      setCategoryData((prev) => ({ ...prev, icon: item.name }))
                    }
                    className="hidden"
                  />
                  <item.icon size={26} strokeWidth={1.5} />
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between items-center gap-3 mt-8">
            <ButtonPrimary wFull type="submit">
                {isEditing ? "Salvar" : "Adicionar"}
            </ButtonPrimary>
            <ButtonSecondary wFull onClick={() => navigate('/categories')}>
              Voltar
            </ButtonSecondary>
          </div>
        </form>
      </ContainerMain>
    </>
  );
}