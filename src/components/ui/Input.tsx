interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
}

export default function Input({ label, type = "text", ...props } : InputProps){
    return(
        <div className='flex flex-col'>
            <label className='ml-3 text-mainFontBold/70'>{label}</label>
            <input type={type} className='bg-mainLightGreen p-2 px-3 rounded-xl'  {...props} />
        </div>
    )
}