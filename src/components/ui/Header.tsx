import { ArrowLeft } from "lucide-react"
import LogoSvg from "../../assets/svg/logo"

interface HeaderProps {
    title?: string
}
export default function Header(props : HeaderProps){
    return(
        <header className="flex items-center justify-between mb-5">
            <button onClick={() => window.history.back()}>
                <ArrowLeft size={32} />
            </button>
            {props.title && (
                <h1 className="w-full text-center text-xl">
                    {props.title}
                </h1>
            )}
            <LogoSvg size={33}/>
        </header>
    )
}