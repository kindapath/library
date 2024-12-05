interface LoadingProps {
  className?: string;
}

export const Loading = ({ className }: LoadingProps) => (
  <div className={`loading ${className || ""}`}>
    <div className="loading__spinner" />
  </div>
);
