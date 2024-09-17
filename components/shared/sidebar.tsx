"use client"

import { useMemo } from 'react'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { navLinks } from "@/constants"
import clsx from 'clsx'

type NavLinkProps = {
  route: string
  icon: string
  label: string
  isActive: boolean
}

const NavLink = ({ route, icon, label, isActive }: NavLinkProps) => (
  <li
    className={clsx(
      'sidebar-nav_element group',
      isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
    )}
  >
    <Link href={route} className="sidebar-link">
      <Image
        src={icon}
        alt={`${label} icon`}
        width={24}
        height={24}
        className={clsx(isActive && 'brightness-200')}
      />
      {label}
    </Link>
  </li>
)

const SignedInContent = () => {
  const pathname = usePathname()
  
  const memoizedNavLinks = useMemo(() => {
    const isLinkActive = (route: string) => route === pathname
    return navLinks.map(link => ({
      ...link,
      isActive: isLinkActive(link.route)
    }))
  }, [pathname])

  const upperNavLinks = memoizedNavLinks.slice(0, 6)
  const lowerNavLinks = memoizedNavLinks.slice(6)

  return (
    <>
      <ul className="sidebar-nav_elements">
        {upperNavLinks.map((link) => (
          <NavLink key={link.route} {...link} />
        ))}
      </ul>
      <ul className="sidebar-nav_elements">
        {lowerNavLinks.map((link) => (
          <NavLink key={link.route} {...link} />
        ))}
        <li className="flex-center cursor-pointer gap-2 p-4">
          <UserButton afterSwitchSessionUrl="/" showName />
        </li>
      </ul>
    </>
  )
}

const SignedOutContent = () => (
  <Button asChild className="button bg-purple-gradient bg-cover">
    <Link href="/sign-in">Login</Link>
  </Button>
)

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/creatify_logo.png"
            alt="Creatify logo"
            width={150}
            height={20}
          />
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            <SignedInContent />
          </SignedIn>
          <SignedOut>
            <SignedOutContent />
          </SignedOut>
        </nav>
      </div>
    </aside>
  )
}
