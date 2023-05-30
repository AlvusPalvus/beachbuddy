import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import BeachList from "./BeachList";
import GoogleLoader from "./GoogleLoader";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { Header } from "./components/Header";
import BeachDetails from "./components/BeachDetails";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

/* const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/badplatser",
        element: <BeachList />,
    },
    {
        path: "/badplatser/:beachId",
        element: <BeachDetails />,
    },
]); */

const Layout = () => (
    <>
        <Header />
        <Outlet />
    </>
);

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <App />,
            },
            {
                path: "/badplatser",
                element: <BeachList />
            },
            {
                path: "/badplatser/:beachId",
                element: <BeachDetails />
            }
        ]
    }
]);

root.render(
    <GoogleLoader>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </GoogleLoader>
);
