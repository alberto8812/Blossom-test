import { createBrowserRouter } from "react-router-dom";
import { PageError } from "../handkeErrors/PageError";
import { Root } from "./Root";
import { DashboardLayout } from "../layouts/DashBoardLayout";
import { CharacterPage } from "../../../modules/chatacters/Character.page";

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
            element: <CharacterPage />,
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
