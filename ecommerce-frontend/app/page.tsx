import Link from "next/link"
import { ShoppingCart, User } from "lucide-react"
import ProductList from "@/components/product-list"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            EcoShop
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to EcoShop</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover our curated collection of sustainable products that are good for you and the planet.
            </p>
            <Button size="lg">Shop Now</Button>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
            <ProductList />
          </div>
        </section>
      </main>

      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">EcoShop</h3>
              <p className="text-muted-foreground">Sustainable products for a better tomorrow.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} EcoShop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
