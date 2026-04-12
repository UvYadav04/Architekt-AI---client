import { createBrowserRouter } from "react-router-dom";
import ErrorFallback from "./pages/ErrorElement";
import MainLayout from "./pages/Layout";
import Home from "./pages/Home/Home";
import { ROUTES } from "./constants";
import Design from "./pages/Designs/Design";
import MyDesigns from "./pages/Designs/MyDesigns";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement:<ErrorFallback/>,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: ROUTES.MY_DESIGNS.path,
                element:<MyDesigns/>
            },
            {
                path: ROUTES.DESIGN_INFO.path,
                element:<Design/>
            },
            {
                path: ROUTES.NEW_DESIGN.path,
                element:<Design/>
            }
        ]
    }
])

export default router