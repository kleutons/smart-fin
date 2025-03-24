import { ArrowRightLeft, Home, Layers, User } from "lucide-react";
import Wrapper from "./Wrapper";
import { useLocation, useNavigate } from "react-router";


const menuList = [
    {
        icon: Home,
        url: '/'
    },
    {
        icon: ArrowRightLeft,
        url: '/transactions'
    },
    {
        icon: Layers,
        url: '/categories'
    },
    {
        icon: User,
        url: '/profile'
    }
]

export default function FooterMenu(){
    
    const navigate = useNavigate();
    const location = useLocation();
    const firstPart = '/' + location.pathname.split("/")[1];
    

    return(
        <footer className="sticky bottom-0 w-full bg-mainWhite py-3 border-t border-white shadow-2xl shadow-black ">
            <Wrapper>
                <div className="flex justify-between">

                    {menuList.map((item, index)=>(

                        <item.icon 
                            size={45} 
                            strokeWidth={1} 
                            className={`p-2 rounded-2xl text-mainFontBold transition-all duration-300 cursor-pointer ${location.pathname === item.url || firstPart == item.url ? 'bg-mainGreen' : 'bg-mainWhite'}`} 
                            onClick={()=>navigate(item.url)} 
                            key={index}
                        />

                    ))}

                </div>
            </Wrapper>

        </footer>
    )
}