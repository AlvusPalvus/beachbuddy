import { LatLngLiteral, TravelMode } from "./googleTypes";

export type UserOptions = {
    inputAddress: string;
    origin: LatLngLiteral;
    travelMode: TravelMode;
};

export type Beach = {
    // Should we add an ID here (to get rid of error msg in console)???
    info: BeachInfo;
    weather?: WeatherInfo;
    travelInfo?: TravelInfo;
};

export type BeachInfo = {
    name: string;
    area: string;
    accessibility: boolean;
    // Change this to a position object?
    coordinateX: number;
    coordinateY: number;
};

export type WeatherInfo = {
    temperature: number;
    windSpeed: number;
    weatherSymbol: number;
};

export type TravelInfo = {
    travelMode: TravelMode;
    travelTime: string;
    distance?: string;
};
