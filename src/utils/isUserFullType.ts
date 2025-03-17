import { UserInputType, UserReturnType } from "../types/UserType";


export default function isUserFullType(data: UserInputType | UserReturnType ): data is UserReturnType {
    return (data as UserReturnType)?.id !== undefined;
}