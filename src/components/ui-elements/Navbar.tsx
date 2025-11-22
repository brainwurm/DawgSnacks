import Link from "next/link";

interface NavbarProps {
  showAuthLinks?: boolean;
  showBackLink?: boolean;
}

export default function Navbar({
  showAuthLinks = false,
  showBackLink = false,
}: NavbarProps) {
  return (
    <header className="border-b border-gray-400 bg-[#4C1B7A]">
      <nav className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-1">
          <Link href="/" className="flex items-center gap-1 hover:opacity-80 transition">
            <img
              src="/DAWG.jpg"
              alt="Dawg Snacks logo"
              className="w-12 h-12 object-cover"
            />
            <h1 className="text-2xl font-serif font-bold tracking-wide text-white">
              Dawg Snacks
            </h1>
          </Link>
        </div>

        <div className="flex gap-6 items-center">
          {showBackLink && (
            <Link
              href="/authenticated-view"
              className="text-white font-medium hover:opacity-80 transition"
            >
              ← Back
            </Link>
          )}

          {showAuthLinks && (
            <>
              <Link
                href="/create-account-page"
                className="text-white font-medium hover:opacity-80 transition cursor-pointer"
              >
                Create Account
              </Link>
              <Link
                href="/login-page"
                className="rounded-full border-2 border-white bg-white text-purple-900 px-6 py-2 font-semibold hover:bg-gray-100 transition cursor-pointer"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
