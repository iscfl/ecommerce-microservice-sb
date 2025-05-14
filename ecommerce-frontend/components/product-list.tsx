"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { productsApi } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

interface Product {
  id: string | number
  name: string
  description: string
  price: number
  image?: string
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await productsApi.getAll()
        setProducts(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-[200px] w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-5 w-1/4 mt-2" />
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>
  }

  if (products.length === 0) {
    return <div className="text-center py-8">No products found.</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="aspect-square relative">
            <Image
              src={product.image || "/placeholder.svg?height=200&width=200"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-muted-foreground text-sm">{product.description}</p>
            <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              View Details
            </Button>
            <Button size="sm" className="flex-1">
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
