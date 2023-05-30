import { BsArrowUp } from "react-icons/bs";

export const ToTopButton = () => {
    // Styles
    const buttonStyles = "flex items-center justify-center rounded-full text-lgblue bg-midnight border-2 border-lgblue";
    const iconStyles = "p-4";

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <div>
            <button onClick={scrollToTop}
                    className={buttonStyles}
            >
                <BsArrowUp size={55} className={iconStyles} />
            </button>
        </div>
    );
};
