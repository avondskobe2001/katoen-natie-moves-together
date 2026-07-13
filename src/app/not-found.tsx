import { Link } from "@/lib/i18n/navigation";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-8xl font-black text-kn-blue-soft">404</p>
      <h1 className="text-2xl font-bold mt-2">Page not found</h1>
      <p className="text-muted-foreground mt-2">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-xl bg-kn-blue px-6 py-3 font-semibold text-white hover:bg-kn-blue-dark transition-colors shadow-md"
      >
        Back to Home
      </Link>
    </div>
  );
}