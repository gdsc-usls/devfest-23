export default function Button({
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`transition-colors px-6 py-3 rounded font-medium text-sm sm:text-base lg:text-lg ${className}`}
      {...rest}
    >
      {rest.children}
    </button>
  );
}
