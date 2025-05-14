"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import DashboardLayout from "@/components/dashboard-layout"
import { productsApi } from "@/lib/api"

export default function AddProductPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    inventory: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProductData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setProductData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session?.accessToken) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to add products.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Format the data for the API
      const formattedData = {
        ...productData,
        price: Number.parseFloat(productData.price),
        inventory: Number.parseInt(productData.inventory, 10),
      }

      await productsApi.create(formattedData, session.accessToken as string)

      toast({
        title: "Product Added",
        description: "Your product has been added successfully.",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Error adding product:", error)
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p className="text-muted-foreground">Create a new product to list in your store</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>Enter the details of your new product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" value={productData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={productData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="home">Home & Kitchen</SelectItem>
                      <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inventory">Inventory</Label>
                  <Input
                    id="inventory"
                    name="inventory"
                    type="number"
                    min="0"
                    value={productData.inventory}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <Input id="image" type="file" />
                <p className="text-sm text-muted-foreground">Image upload will be implemented with the REST API</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.push("/dashboard")} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Product"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  )
}
