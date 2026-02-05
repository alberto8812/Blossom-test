import { Outlet } from "react-router-dom";
import { SideMenu } from "../sideMenu/SideMenu";
import { ErrorBoundary } from "../../../../../../shared/presentation/handkeErrors/GlobalErrorBoundary";
import { PageError } from "../../../../../../shared/presentation/handkeErrors/PageError";

export const DashBoardCharactersLayout = () => {
  return (
    <ErrorBoundary
      fallback={(error, errorInfo) => {
        return <PageError />;
      }}
    >
      <div
        className="flex w-screen h-screen"
        style={{ backgroundColor: "var(--surface)" }}
      >
        <SideMenu />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </ErrorBoundary>
  );
};
