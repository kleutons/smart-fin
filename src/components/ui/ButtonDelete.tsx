interface ButtonSecondaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    addClass?:string;
    children?: React.ReactNode;
    wFull?: boolean;
}

export default function ButtonDelete(props : ButtonSecondaryProps){
    const isWFull = props.wFull ? 'w-full' : '';

    return(
        <button type="button" className={`bg-rose-100 text-rose-900 py-2 px-3 rounded-xl cursor-pointer ${isWFull} ${props.addClass}`} {...props}>
            {props.children}
        </button>
    )
    
}
