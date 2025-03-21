import { Plus } from "lucide-react";
import ButtonPrimary from "../components/ui/ButtonPrimary";
import ContainerMain from "../components/ui/ContainerMain";
import ContainerTop from "../components/ui/ContainerTop";
import Header from "../components/ui/Header";
import { useNavigate } from "react-router";
import { useCategory } from "../hooks/useCategory";
import { IconCategory } from "../utils/IconsCategory";
import { Toaster } from "react-hot-toast";


export default function CategoryPage() {
  const navigate = useNavigate();
  const { categories } = useCategory();

  // Função para renderizar o ícone com base no nome salvo
  const renderIcon = (iconName: string) => {
    const icon = IconCategory.find((item) => item.name.toLowerCase() === iconName.toLowerCase());
    return icon ? <icon.icon size="65%" strokeWidth={1.5} /> : null; // Renderiza o ícone ou nada
  };

  return (
    <>
      <Toaster/>

      <ContainerTop>
        <Header title="Categorias" />
      </ContainerTop>
      <ContainerMain>

        {/* Botão para adicionar nova categoria */}
        <div className="fixed bottom-20 right-4 opacity-80 hover:opacity-100">
          <ButtonPrimary onClick={() => navigate("/categories/action")}>
            <Plus size={24} />
          </ButtonPrimary>
        </div>

        {/* Exibição das categorias */}
        <div className="grid grid-cols-3 gap-4">
          {categories.map((item) => (
            <div
              key={item.id}
              className="bg-mainLightGreen flex flex-col justify-center items-center rounded-2xl p-4 gap-2 cursor-pointer"
              onClick={() => navigate(`/categories/action/${item.id}`)}
            >
              {renderIcon(item.icon)} {/* Renderiza o ícone baseado no nome */}
              <p className="text-sm w-full truncate text-center">{item.name}</p>
            </div>
          ))}
        </div>
      </ContainerMain>
    </>
  );
}