"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, CheckSquare, List, Settings } from "lucide-react"

const menuItems = [
  { text: "Dashboard", icon: LayoutDashboard, path: "/" },
  { text: "Tasks", icon: CheckSquare, path: "/tasks" },
  { text: "Lists", icon: List, path: "/lists" },
  { text: "Settings", icon: Settings, path: "/settings" },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-full border-r bg-background p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent",
              pathname === item.path && "bg-accent text-accent-foreground"
            )}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
