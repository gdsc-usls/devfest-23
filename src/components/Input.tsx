export default function Input({
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="bg-transparent border rounded border-zinc-600 px-4 py-3 text-white outline-none w-full text-sm sm:text-base"
      {...rest}
    />
  );
}
