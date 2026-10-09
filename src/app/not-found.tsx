import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-fg">
        This page doesn&apos;t exist.
      </h1>
      <Link
        href="/"
        className="mt-8 rounded-full border border-border px-6 py-3 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
      >
        Back home
      </Link>
    </div>
  );
}
