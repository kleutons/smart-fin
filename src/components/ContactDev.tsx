import Github from "../assets/svg/github";
import Linkedin from "../assets/svg/linkedin";
import WebSite from "../assets/svg/website";


export default function ContactDev(){
    return <div className="flex gap-2">
                <a href="https://www.linkedin.com/in/kleuton-novais/" className="flex items-center justify-center p-2 md:p-3 rounded-md text-black hover:text-white bg-mainWhite hover:bg-blue-700 hover:underline" target="__black">
                    <Linkedin />
                </a>

                <a href="https://github.com/kleutons" className="flex items-center justify-center p-2 md:p-3 rounded-md text-black hover:text-white bg-mainWhite hover:bg-black hover:underline" target="__black">
                    <Github />
                </a>

                <a href="https://kleuton.dev" className="flex items-center justify-center  p-2 md:p-3 rounded-md text-black hover:text-white bg-mainWhite hover:bg-green-400 hover:underline"  target="__black">
                    <WebSite />
                </a>

            </div>
}