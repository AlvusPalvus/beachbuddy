import { MdSunny } from "react-icons/md";
import { ReactComponent as Waves } from "../images/wave.svg";
import { ReactComponent as Umbrella } from "../images/umbrella.svg";

export const Header = () => {
    const headerStyles =
        "header flex items-space-between pb-7 pt-10 text-dkblue justify-between";
    const logoStyles =
        "logo flex flex-col items-center text-basebold leading-5 ml-20";

    return (
        <div className={headerStyles}>
            <div className={logoStyles}>
                <span>BEACH</span>
                <span>BUDDY</span>
            </div>
            <div className="header-icons flex flex-row items-center justify-center mr-20">
                <Waves className="mx-5" />
                <MdSunny size={35} className="mx-4" />
                <Umbrella className="mx-6" />
            </div>
        </div>
    );
};
