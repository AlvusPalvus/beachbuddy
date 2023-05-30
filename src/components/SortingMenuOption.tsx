import { BsSunFill } from "react-icons/bs";
import { RiPinDistanceFill } from "react-icons/ri";
import { MdAccessibleForward } from "react-icons/md";
import { FiWind } from "react-icons/fi";
import { useAppSelector } from "../app/hooks";

type Props = {
    onClickFunction: Function,
    type: string,
};

export const SortingMenuOption = (props: Props) => {
    const activeOrder = useAppSelector(
        (state) => state.sorting.order
    );

    // Styles
    const buttonStyles = "flex items-center justify-center rounded-full mb-2";
    const activeButtonStyles = "text-lgblue bg-midnight border-2 border-color-lgblue";
    const inactiveButtonStyles = "text-midnight border-2 border-midnight";
    const iconStyles = "p-4";

    return (
        <div>
            {props.type === activeOrder &&
                <button onClick={() => {props.onClickFunction(props.type)}}
                        className={activeButtonStyles + " " + buttonStyles}
                >
                    {props.type === "distance" && <RiPinDistanceFill size={55} className={iconStyles} />}
                    {props.type === "accessibility" && <MdAccessibleForward size={55} className={iconStyles} />}
                    {props.type === "sun" && <BsSunFill size={55} className={iconStyles} />}
                    {props.type === "wind" && <FiWind size={55} className={iconStyles} />}
                </button>
            }
            {props.type !== activeOrder && 
                <button onClick={() => {props.onClickFunction(props.type)}}
                        className={inactiveButtonStyles + " " + buttonStyles}
                >
                    {props.type === "distance" && <RiPinDistanceFill size={55} className={iconStyles} />}
                    {props.type === "accessibility" && <MdAccessibleForward size={55} className={iconStyles} />}
                    {props.type === "sun" && <BsSunFill size={55} className={iconStyles} />}
                    {props.type === "wind" && <FiWind size={55} className={iconStyles} />}
                </button>
            }
        </div>
    );
};
