import Image from "next/image";
import Link from "next/link";
import { Megaphone } from "lucide-react";

const navLinks = [
  { href: "/", label: "All Events" },
  { href: "/judges", label: "Judges" },
  { href: "/dogs", label: "Dogs" },
  { href: "/search", label: "Search" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="bg-mainAlt text-primary text-center text-xs sm:text-sm py-2 px-4 font-semibold tracking-wide uppercase">
        Show Results powered by ShowSight Magazine
      </div>
      <div className="flex items-center justify-between pl-2 pr-4 py-3 container-screen">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={180}
              height={46}
              priority={true}
              className="object-contain hidden sm:block"
            />
            <Image
              src="/logo-xs.png"
              alt="Logo"
              width={36}
              height={36}
              priority={true}
              className="object-contain block sm:hidden"
            />
          </Link>

          <nav className="hidden items-center gap-4 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 transition hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-3 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-gray-700 transition hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="#"
            className="flex items-center gap-2 text-main font-bold text-xs sm:text-sm uppercase tracking-wide hover:opacity-80 transition"
          >
            <Megaphone size={18} />
            <span className="hidden sm:inline">Advertise</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
