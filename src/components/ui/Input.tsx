interface InputProps {
    label: string,
    value?: string
}
export default function Input(props : InputProps){
    return(
        <div className='flex flex-col'>
            <label className='ml-3 text-mainFontBold/70'>{props.label}</label>
            <input type='text' className='bg-mainLightGreen p-3 rounded-xl'  value={props.value} />
        </div>
    )
}