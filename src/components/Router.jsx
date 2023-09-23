import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Homepage from "./Homepage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [{ path: "home", element: <Homepage /> }],
    },
    {
      path: "/:name",
      element: <App />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
