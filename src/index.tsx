import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BeachList from "./BeachList";
import GoogleLoader from "./GoogleLoader";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/badplatser/:userOptions",
        element: <BeachList />,
    },
]);

root.render(
    <React.StrictMode>
        <GoogleLoader>
            <RouterProvider router={router} />
        </GoogleLoader>
    </React.StrictMode>
);
