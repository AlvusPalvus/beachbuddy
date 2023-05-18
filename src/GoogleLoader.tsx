import { useLoadScript } from "@react-google-maps/api";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const GoogleLoader = ({ children }: Props) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    });
    if (!isLoaded) {
        return <div>Lodaing...</div>;
    }
    return <div>{children}</div>;
};

export default GoogleLoader;
