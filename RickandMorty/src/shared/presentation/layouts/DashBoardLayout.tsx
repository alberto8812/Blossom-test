import { Outlet } from "react-router-dom";

import { PageError } from "../handkeErrors/PageError";
import { ErrorBoundary } from "../handkeErrors/GlobalErrorBoundary";

export const DashboardLayout = () => {
  return (
    <ErrorBoundary
      fallback={(error, errorInfo) => {
        return <PageError />;
      }}
    >
      <div className="bg-white overflow-y-scroll w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white">
        <Outlet />
      </div>
    </ErrorBoundary>
  );
};
