interface ButtonLoaderProps {
  containerClassName?: string;
  className?: string;
}

export default function ButtonLoader({
  className,
  containerClassName = "h-full",
}: ButtonLoaderProps) {
  return (
    <div className={`flex justify-center items-center ${containerClassName}`}>
      <div
        className={`h-6 w-6 animate-spin rounded-full border-2 border-t-transparent border-white ${className}`}
      ></div>
      {/* <span className="ml-3">Loading...</span> */}
    </div>
  );
}
