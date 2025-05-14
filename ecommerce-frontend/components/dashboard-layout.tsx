import Link from "next/link"
import type { ReactNode } from "react"
import { BarChart, Home, Package, Settings, ShoppingCart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-muted/40">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center font-semibold">
            <Package className="mr-2 h-5 w-5" />
            EcoShop Admin
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-4 space-y-1">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/products">
              <Button variant="ghost" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                Products
              </Button>
            </Link>
            <Link href="/dashboard/orders">
              <Button variant="ghost" className="w-full justify-start">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Orders
              </Button>
            </Link>
            <Link href="/dashboard/customers">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Customers
              </Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button variant="ghost" className="w-full justify-start">
                <BarChart className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
        </nav>
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-muted"></div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
