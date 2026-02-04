import { createBrowserRouter } from "react-router-dom";

import { DashboardLayout } from "../layouts/DashBoardLayout";
import { Root } from "./Root";
import { CharacterPages } from "../pages";
import { PageError } from "../components/erros/PageError";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      /// Dashboard Routes
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "characters/:id",
            element: <CharacterPages />,
          },
          {
            path: "bears",
            element: <></>,
          },
        ],
      },
      {
        path: "404",
        element: <PageError />,
      },
      {
        path: "*",
        element: <DashboardLayout />,
      },
    ],
  },
]);
