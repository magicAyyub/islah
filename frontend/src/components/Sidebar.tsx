'use client'

import Link from 'next/link'
import { Settings } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from 'react'
import { menuItems } from '@/app/base'

interface SidebarProps {
  activeTab?: string
}

const Sidebar = (props: SidebarProps) => {
  const [currentTab, setCurrentTab] = useState(props.activeTab)




  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
      {menuItems.map((item) => (
        <Tooltip key={item.name}>
          <TooltipTrigger asChild>
            {
              currentTab === item.name ? (
                <Link
                  href={item.href}
                  className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                  onClick={() => setCurrentTab(item.name)}
                >
                  <item.icon className="h-4 w-4 transition-all group-hover:scale-110" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              ) : 
                
              (
                <Link
                  href={item.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  onClick={() => setCurrentTab(item.name)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              )
            }
          </TooltipTrigger>
          <TooltipContent side="right">{item.name}</TooltipContent>
        </Tooltip>
      ))
    }
    </nav>
    <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="#"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">Settings</TooltipContent>
      </Tooltip>
    </nav>
  </aside>
  )
}

export default Sidebar

