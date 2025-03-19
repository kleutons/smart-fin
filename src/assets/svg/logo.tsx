interface iProps {
    size?: number;
}

export default function LogoSvg({size}: iProps){
    const newSize = size ? size.toString() : '119';

    return(
        <svg width={newSize} height={newSize} viewBox="0 0 119 119" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M56.4343 119.778V66.9994H77.6395V119.778M20.9294 119.778V94.173H42.1346V119.778M92.7948 119.778V41.7813H114V119.778M5 78.59L50.364 33.2259L65.8045 47.1386L106.911 6.05229M105.974 24.8334L107.868 7.68191C107.904 7.32097 107.858 6.95671 107.735 6.61554C107.612 6.27437 107.415 5.96483 107.158 5.70937C106.9 5.45391 106.589 5.25895 106.247 5.13858C105.905 5.01821 105.541 4.97546 105.18 5.01344L88.0485 6.90784" stroke="currentColor" stroke-width="8.6625" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}