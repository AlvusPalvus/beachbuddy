import { useState } from "react";
import { Beach } from "../types/beachTypes";
import { sortBeaches } from "../functions/sortBeaches";
import { BsSortDown } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { SortingMenuOption } from "./SortingMenuOption";
import { useAppDispatch } from "../app/hooks";
import { setOrder } from "../features/sorting/sortingSlice";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
    beachList?: Beach[];
    setBeaches: Function;
}

export const SortingMenu = (props: Props) => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useAppDispatch();

    // Styles
    const buttonStyles = "flex items-center justify-center rounded-full mb-2 text-lgblue bg-midnight border-2 border-color-lgblue";
    const iconStyles = "p-4";

    const toggleMenu = () => {
        if (!showMenu) {
            setShowMenu(true);
        } else {
            setShowMenu(false);
        }
    };

    const handleSort = (order: string) => {
        if (props.beachList !== undefined) {
            const sortedBeachList = sortBeaches(props.beachList, order);
            props.setBeaches(sortedBeachList);
            dispatch(setOrder(order));
        }
    };

    return (
        <div className="mr-7 flex flex-col">
            <div>
                {!showMenu && (
                    <button
                        onClick={toggleMenu}
                        className={buttonStyles}
                    >
                        <BsSortDown size={55} className={iconStyles} />
                    </button>
                )}
                {showMenu && (
                    <button
                    onClick={toggleMenu}
                    className={buttonStyles}
                    >
                        <CgClose size={55} className={iconStyles} />
                    </button>
                )}
            </div>
            <AnimatePresence>
                {showMenu && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .5 }}
                    >
                        <SortingMenuOption onClickFunction={handleSort} type="distance" />
                        <SortingMenuOption onClickFunction={handleSort} type="accessibility" />
                        <SortingMenuOption onClickFunction={handleSort} type="sun" />
                        <SortingMenuOption onClickFunction={handleSort} type="wind" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
