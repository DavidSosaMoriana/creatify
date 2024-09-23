'use client'

import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

interface NavLinkType {
    route: string
    icon: string
    label: string
  }

  const NavLink = ({ link, isActive }: { link: NavLinkType; isActive: boolean }) => (
  <li className={`sidebar-nav_element group ${
    isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
  }`}>
    <Link className="sidebar-link" href={link.route}>
      <Image 
        src={link.icon}
        alt={`${link.label} icon`}
        width={24}
        height={24}
        className={isActive ? 'brightness-200' : ''}
      />
      {link.label}
    </Link>
  </li>
)

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image src="/assets/images/creatify_logo.png" alt="logo" width={180} height={28} />
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {navLinks.slice(0, 6).map((link) => (
                <NavLink key={link.route} link={link} isActive={link.route === pathname} />
              ))}
            </ul>

            <ul className="sidebar-nav_elements">
              {navLinks.slice(6).map((link) => (
                <NavLink key={link.route} link={link} isActive={link.route === pathname} />
              ))}

              <li className="flex-center cursor-pointer gap-2 p-4">
                <UserButton afterSwitchSessionUrl='/' showName />
              </li>
            </ul>
          </SignedIn>

          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
