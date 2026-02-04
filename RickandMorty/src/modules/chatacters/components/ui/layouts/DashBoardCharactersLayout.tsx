import { Outlet } from "react-router-dom";
import { SideMenu } from "../sideMenu/SideMenu";
import { ErrorBoundary } from "../../../../../shared/presentation/handkeErrors/GlobalErrorBoundary";
import { PageError } from "../../../../../shared/presentation/handkeErrors/PageError";

export const DashBoardCharactersLayout = () => {
  return (
    <ErrorBoundary
      fallback={(error, errorInfo) => {
        return <PageError />;
      }}
    >
      <div className="bg-white overflow-y-scroll w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white">
        <div className="flex flex-row relative w-screen">
          <SideMenu />

          <div className="w-full p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};
