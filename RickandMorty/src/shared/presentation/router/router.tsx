import { createBrowserRouter } from "react-router-dom";
import { PageError } from "../handkeErrors/PageError";
import { Root } from "./Root";
import { DashboardLayout } from "../layouts/DashBoardLayout";
import { CharacterPage } from "../../../modules/chatacters/presentation/Character.page";
import { DashBoardCharactersLayout } from "../../../modules/chatacters/components/ui/layouts/DashBoardCharactersLayout";
import BlossomHero from "../../../modules/chatacters/presentation/intro.page";

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
            path: "",
            element: <DashBoardCharactersLayout />,
            children: [
              {
                path: "",
                element: <BlossomHero />,
              },
              {
                path: "characters/:id",
                element: <CharacterPage />,
              },
            ],
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
