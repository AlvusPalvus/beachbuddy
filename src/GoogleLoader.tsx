import { useLoadScript } from "@react-google-maps/api";
import { ReactNode } from "react";
import { Loader } from "./components/Loader";

type Props = {
    children: ReactNode;
};

const GoogleLoader = ({ children }: Props) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
        libraries: ["places"],
    });
    if (!isLoaded) {
        return <Loader />;
    }
    return <div>{children}</div>;
};

export default GoogleLoader;
