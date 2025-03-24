interface ButtonSecondaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    addClass?:string;
    children?: React.ReactNode;
    wFull?: boolean;
}

export default function ButtonSecondary(props : ButtonSecondaryProps){
    const isWFull = props.wFull ? 'w-full' : '';

    return(
        <button type="button" className={`bg-mainLightGreen text-mainFontBold font-semibold py-2 px-3 rounded-xl cursor-pointer ${isWFull} ${props.addClass}`} {...props}>
            {props.children}
        </button>
    )
    
}
