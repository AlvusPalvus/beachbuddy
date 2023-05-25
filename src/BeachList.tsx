import { useState } from "react";
import { getDate } from "./functions/getDate";
import BeachCard from "./components/BeachCard";
import { UserOptions } from "./types/beachTypes";
import useFetchAllBeaches from "./hooks/useFetchAllBeaches";
import { useAppSelector } from "./app/hooks";
import { Loader } from "./components/Loader";

type Props = {};

const BeachList = (props: Props) => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState("");
    const today = getDate();
    const userOptions: UserOptions = useAppSelector(
        (state) => state.userOptions
    );

    const beachList = useFetchAllBeaches({
        setIsPending,
        setError,
        userOptions,
    });

    return (
        <div className="beach-list font-default flex flex-col items-center mb-20">
            <h2 className="text-xl text-dkblue mt-2">Dina badplatsförslag</h2>
            <h3 className="text-lbold text-mdblue mt-1 mb-11">
                {today.day} {today.date}, {today.time}
            </h3>
            {isPending && (
                <Loader />
            )}
            {error && <p>{error}</p>}

            {!isPending && (
                <div className="beach-grid grid-cols-3">
                    {beachList &&
                        beachList.map((item, i) => (
                            <BeachCard beach={item} key={i} />
                        ))}
                </div>
            )}
        </div>
    );
};

export default BeachList;
