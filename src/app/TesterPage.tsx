import { Toaster } from "react-hot-toast";
import UserService, { TypeUser } from "../services/UserService";
import { useEffect, useState } from "react";


export default function TesterPage(){

    const service = new UserService();


    const [userList, setUserList] = useState<TypeUser[]>([]);


    useEffect(()=>{
        const loadUsers = async () =>{
            setUserList(await service.listAll());
        };
        loadUsers();
    },[])

    return(
    <main className="fixed left-0 right-0 top-0 flex flex-col bottom-0 items-center justify-center bg-emerald-400">
        <Toaster />
        <h1 className="text-2xl">Tester</h1>

        <div className=" border-t border-mainFontBold w-[85%]">
            <h2>Users: {userList.length}</h2>
            <div>
                {userList.map((item)=>(
                    <div>
                        Nome: {item.name} - Email: {item.email}
                    </div>
                ))}
            </div>
        </div>

    </main>
    );
}