import Wrapper from "./Wrapper";

interface ContainerTopProps {
    children?: React.ReactNode;
}
export default function ContainerTop(props : ContainerTopProps){
    return(
        <div className="bg-mainGreen top-0 text-white pb-24 pt-4">
            <Wrapper>
                {props.children}
            </Wrapper>
        </div>
    )
}