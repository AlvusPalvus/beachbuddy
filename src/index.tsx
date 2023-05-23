import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BeachList from "./BeachList";
import GoogleLoader from "./GoogleLoader";
import { store } from "./app/store";
import { Provider } from 'react-redux';
import { Header } from "./components/Header";

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
    <GoogleLoader>
        <Provider store={store}>
            <Header />
            <RouterProvider router={router} />
        </Provider>
    </GoogleLoader>
);
