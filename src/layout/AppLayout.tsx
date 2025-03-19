import { Outlet } from "react-router";
import FooterMenu from "../components/ui/FooterMenu";

export default function AppLayout(){
    return(
        <div className="flex flex-col h-screen justify-between">
            <div>
                <Outlet />
            </div>
            <FooterMenu />
        </div>
    )
}