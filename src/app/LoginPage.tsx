import { useNavigate } from "react-router";
import LogoSvg from "../assets/svg/logo";
import ButtonSecondary from "../components/ui/ButtonSecondary";

export default function LoginPage(){

    const navigate = useNavigate();

    return(
    <main className="fixed left-0 right-0 top-0 flex flex-col bottom-0 items-center justify-center bg-emerald-400">
        <div className="max-w-md flex flex-col gap-5">
            <div className="flex flex-col items-center justify-center">
                <LogoSvg />
                <h1 className="text-5xl font-semibold text-white p-4">
                    SmartFin
                </h1>
            </div>

            <ButtonSecondary wFull onClick={()=>navigate('/')}>
                Entrar
            </ButtonSecondary>
        </div>
    </main>
    );
}