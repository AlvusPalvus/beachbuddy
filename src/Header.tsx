import { TiWaves } from "react-icons/ti";

export const Header = () => {
    const headerStyles = "header flex items-space-between bg-green-100 py-7";
    const logoStyles = "logo flex flex-col items-center text-lbold leading-7";

    return(
        <div className={headerStyles}>
            <div className={logoStyles}>
                <span>BEACH</span>
                <span>BUDDY</span>
            </div>
            <div className="header-icons flex flex-row items-center">
                <TiWaves size={50} />
            </div>
        </div>
    );
};