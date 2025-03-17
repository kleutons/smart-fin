import { CategoryFullType, CategoryInputType } from "../types/CategoryType";

export default function isCategoryFullType(data: CategoryInputType | CategoryFullType): data is CategoryFullType {
    return (data as CategoryFullType)?.id !== undefined;
}