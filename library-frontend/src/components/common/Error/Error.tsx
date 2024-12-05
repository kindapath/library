interface ErrorProps {
  message: string;
  className?: string;
}

export const Error = ({ message, className }: ErrorProps) => (
  <div className={`error ${className || ""}`}>
    <p className="error__message">{message}</p>
  </div>
);
