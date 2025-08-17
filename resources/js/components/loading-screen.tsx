// loading-screen.tsx
import clsx from "clsx";
import "../../css/cube-loader.css";

export const Loading: React.FC<{
  variant?: "full" | "overlay";
}> = ({ variant = "full" }) => {
  return (
    <div
      className={clsx(
        "flex justify-center items-center z-50",
        variant === "full" && "h-screen w-screen bg-white dark:bg-gray-900",
        variant === "overlay" &&
          "fixed inset-0 bg-black/50"
      )}
    >
      <div className="sk-cube-grid">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={`sk-cube sk-cube${i + 1}`} />
        ))}
      </div>
    </div>
  );
};
