import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-20 overflow-hidden px-10 text-center">
      <h1 className="flex flex-col  font-medium gap-3">
        <span className="text-3xl">Sorry</span>{" "}
        <span className="text-lg">this page is not available</span>
      </h1>
      <p className="text-onlyfans-light-gray mt-8">
        The link you followed may be broken, or the page may have been removed.
      </p>
      <Link
        href={"/"}
        className="text-onlyfans-light-blue hover:text-onlyfans-blue transition-all duration-[50ms] text-sm mt-3"
      >
        Go back to Home
      </Link>
    </div>
  );
}
