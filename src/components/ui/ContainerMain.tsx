import Wrapper from "./Wrapper";

interface ContainerMainProps {
    children?: React.ReactNode;
}
export default function ContainerMain(props : ContainerMainProps){
    return(
        <div className="bg-mainWhite -mt-18 min-h-20 rounded-t-[2.5rem] pt-7">
            <Wrapper>
                {props.children}
            </Wrapper>
        </div>
    )
}