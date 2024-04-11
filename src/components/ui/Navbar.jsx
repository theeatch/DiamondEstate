"use client";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from "next/navigation";
const Navbar = () => {
    const pathName = usePathname();

  return (
    <header className="flex h-20 items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <Image alt="Logo" src="/logos.svg" width={200} height={200} />
        </Link>
      </div>
      <nav className="flex items-center gap-5 text-2xl">
        <Link
          className={` ${pathName === '/' ? 'font-bold text-3xl text-blue-500 underline' : 'text-black'}  hover:scale-110 duration-300 hover:underline`}
          href="/"
        >
          Dashboard
        </Link>
        <Link
          className={` ${pathName === '/analytics' ? 'font-bold text-3xl text-blue-500 underline' : 'text-black'} hover:scale-110 duration-300 hover:underline`} 
          href="/analytics"
        >
          Analytics
        </Link>
        <Link
          className={` ${pathName === '/profile' ? 'font-bold text-3xl text-blue-500 underline' : 'text-black'} hover:scale-110 duration-300 hover:underline`}
          href="/profile"
        >
          Profile
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
