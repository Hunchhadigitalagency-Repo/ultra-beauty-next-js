interface LoadingSpinnerProps {
  containerClassName?: string;
  className?: string;
}

export default function LoadingSpinner({
  className,
  containerClassName="h-screen",
}: LoadingSpinnerProps) {
  return (
    <div className={`flex justify-center items-center ${containerClassName}`}>
      <div
        className={`animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary ${className}`}
      ></div>
      <span className="ml-3">Loading...</span>
    </div>
  );
}
