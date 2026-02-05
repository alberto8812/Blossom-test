interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export const Loading = ({
  text = "Loading...",
  fullScreen = false,
}: LoadingProps) => {
  const containerClass = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-[var(--surface-sidebar)]"
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-[var(--accent)] opacity-20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--accent)] animate-spin"></div>
          <div
            className="absolute inset-2 rounded-full border-4 border-transparent border-t-green-400 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
          ></div>
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-green-400 to-[var(--accent)] animate-pulse"></div>
        </div>
        <div className="flex items-center gap-1">
          <span
            className="text-sm font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            {text}
          </span>
          <span className="flex gap-1">
            <span
              className="w-1 h-1 rounded-full bg-[var(--accent)] animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></span>
            <span
              className="w-1 h-1 rounded-full bg-[var(--accent)] animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></span>
            <span
              className="w-1 h-1 rounded-full bg-[var(--accent)] animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></span>
          </span>
        </div>
      </div>
    </div>
  );
};
