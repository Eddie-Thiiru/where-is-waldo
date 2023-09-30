import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Homepage from "./Homepage";
import LeaderboardPage from "./LeaderBoardPage";

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
    {
      path: "/leaderboard/:name",
      element: <LeaderboardPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
