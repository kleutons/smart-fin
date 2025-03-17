import { ProductFullType, ProductInputType } from "../types/ProdutctType";

export default function isProductFullType(data: ProductInputType | ProductFullType ): data is ProductFullType {
    return (data as ProductFullType)?.id !== undefined;
}