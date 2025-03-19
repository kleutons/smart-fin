interface WrapperProps {
    children?: React.ReactNode;
}
export default function Wrapper(props : WrapperProps){
    return(
        <div className="px-6">
            {props.children}
        </div>
    )
}