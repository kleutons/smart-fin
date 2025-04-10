interface ButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    addClass?:string;
    children?: React.ReactNode;
    wFull?: boolean;
}

export default function ButtonPrimary(props : ButtonPrimaryProps){
    const isWFull = props.wFull ? 'w-full' : '';

    return(
        <button className={`bg-mainGreen text-mainFontBold font-semibold py-2 px-3 rounded-lg cursor-pointer ${isWFull} ${props.addClass}`} {...props}>
            {props.children}
        </button>
    )
    
}
