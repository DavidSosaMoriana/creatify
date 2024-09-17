"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

interface NavLinkType {
    route: string
    icon: string
    label: string
  }

  const NavLink = ({ link, isActive }: { link: NavLinkType; isActive: boolean }) => (
  <li
    className={`p-18 flex whitespace-nowrap text-dark-700 ${
      isActive ? "gradient-text" : ""
    }`}
  >
    <Link className="sidebar-link cursor-pointer" href={link.route}>
      <Image
        src={link.icon}
        alt={`${link.label} icon`}
        width={24}
        height={24}
      />
      {link.label}
    </Link>
  </li>
);

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/creatify_logo.png"
          alt="Creatify logo"
          width={150}
          height={25}
        />
      </Link>

      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSwitchSessionUrl="/" />
          <Sheet>
            <SheetTrigger>
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <Image
                src="/assets/images/creatify_logo.png"
                alt="Creatify logo"
                width={150}
                height={23}
              />
              <ul className="header-nav_elements">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.route}
                    link={link}
                    isActive={link.route === pathname}
                  />
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </SignedIn>
        <SignedOut>
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
