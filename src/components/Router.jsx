import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Homepage from "./Homepage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Homepage /> },
        { path: "home", element: <Homepage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
