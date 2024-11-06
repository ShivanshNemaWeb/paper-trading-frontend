"use client"

import GoBack from "./go-back"
import { usePathname } from "next/navigation"
import CommandMenu from "./command-menu"

const NAVIGATION = [
  { title: "Markets", href: "/market" },
  { title: "Screener", href: "/screener" },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0  w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex w-full flex-row justify-between py-4">
          <div>{pathname !== "/" && <GoBack />}</div>
          <div className="flex flex-row items-center gap-2">
           
            {/* <CommandMenu /> */}

            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>
    </header>
  )
}
