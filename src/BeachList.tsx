import { useState } from "react";
import { getDate } from "./functions/getDate";
import BeachCard from "./components/BeachCard";
import { UserOptions } from "./types/beachTypes";
import useFetchAllBeaches from "./hooks/useFetchAllBeaches";
import { useAppSelector } from "./app/hooks";
import { Loader } from "./components/Loader";
import { SortingMenu } from "./components/SortingMenu";
import { motion } from "framer-motion";
import { ToTopButton } from "./components/ToTopButton";

type Props = {};

const BeachList = (props: Props) => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState("");
    const today = getDate();
    const userOptions: UserOptions = useAppSelector(
        (state) => state.userOptions
    );

    const { beaches: beachList, setBeaches } = useFetchAllBeaches({
        setIsPending,
        setError,
        userOptions,
    });

    return (
        <div className="beach-list font-default flex flex-col items-center mb-20">
            <h2 className="text-xl text-dkblue mt-2">Dina badplatsförslag</h2>
            <h3 className="text-lbold text-mdblue mt-1 mb-14">
                {today.day} {today.date}, {today.time}
            </h3>
            {isPending && (
                <Loader />
            )}
            {error && <p>{error}</p>}
            {!isPending && (
                <div className="flex flex-row justify-center">
                    <SortingMenu beachList={beachList} setBeaches={setBeaches} />
                    <motion.div 
                        className="beach-grid grid-cols-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {beachList &&
                            beachList.map((item, i) => (
                                <BeachCard beach={item} key={i} />
                            ))
                        }
                    </motion.div>
                    <div className="self-end ml-7">
                        <ToTopButton />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BeachList;
