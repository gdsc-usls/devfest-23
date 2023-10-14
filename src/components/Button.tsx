export default function Button({
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`bg-white hover:bg-gray-100 transition-colors px-6 py-3 rounded text-black font-medium text-sm sm:text-base ${className}`}
      {...rest}
    >
      {rest.children}
    </button>
  );
}
