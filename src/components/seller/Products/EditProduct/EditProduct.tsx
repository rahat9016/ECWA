"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Save,
  Eye,
  Package,
  DollarSign,
  Tag,
  Truck,
  BarChart3,
  TrendingUp,
  Calendar,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Sports & Fitness",
  "Books & Media",
  "Beauty & Personal Care",
] as const

// type Category = (typeof CATEGORIES)[number]
type ProductStatus = "draft" | "active"

interface ProductDimensions {
  length: number
  width: number
  height: number
}

interface ProductSales {
  totalSold: number
  revenue: number
  views: number
  conversionRate: number
}

interface EditProductFormData {
  id: number
  name: string
  description: string
  shortDescription: string
  sku: string
  price: number
  comparePrice: number
  cost: number
  category: string
  brand: string
  tags: string[]
  stock: number
  trackQuantity: boolean
  continueSellingWhenOutOfStock: boolean
  weight: number
  dimensions: ProductDimensions
  seoTitle: string
  seoDescription: string
  status: ProductStatus
  images: string[]
  createdAt: string
  updatedAt: string
  sales: ProductSales
}

// Sample product data for editing
const SAMPLE_PRODUCT: EditProductFormData = {
  id: 1,
  name: "Premium Wireless Bluetooth Headphones",
  description:
    "High-quality wireless headphones with active noise cancellation, premium sound quality, and long-lasting battery life. Perfect for music lovers and professionals.",
  shortDescription: "Premium wireless headphones with noise cancellation",
  sku: "WH-001",
  price: 299.99,
  comparePrice: 349.99,
  cost: 150.0,
  category: "Electronics",
  brand: "AudioTech",
  tags: ["wireless", "bluetooth", "headphones", "noise-cancellation"],
  stock: 25,
  trackQuantity: true,
  continueSellingWhenOutOfStock: false,
  weight: 0.35,
  dimensions: {
    length: 20,
    width: 18,
    height: 8,
  },
  seoTitle: "Premium Wireless Bluetooth Headphones - AudioTech",
  seoDescription:
    "Experience superior sound quality with our premium wireless Bluetooth headphones featuring active noise cancellation.",
  status: "active",
  images: [
    "/placeholder.svg?height=200&width=200&text=Headphones+1",
    "/placeholder.svg?height=200&width=200&text=Headphones+2",
    "/placeholder.svg?height=200&width=200&text=Headphones+3",
  ],
  createdAt: "2024-01-15",
  updatedAt: "2024-01-20",
  sales: {
    totalSold: 156,
    revenue: 46794.44,
    views: 2847,
    conversionRate: 5.48,
  },
}

export default function EditProduct() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id

  const [formData, setFormData] = useState<EditProductFormData>(SAMPLE_PRODUCT)
  const [images, setImages] = useState<string[]>(SAMPLE_PRODUCT.images)
  const [currentTag, setCurrentTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch the product data here
    // For demo purposes, we're using the sample data
    console.log("Loading product:", productId)
  }, [productId])

  const handleInputChange = (field: keyof EditProductFormData | string, value: string | number | boolean) => {
    setHasChanges(true)
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      if (parent === "dimensions" && child && (child === "length" || child === "width" || child === "height")) {
        setFormData((prev) => ({
          ...prev,
          dimensions: {
            ...prev.dimensions,
            [child]: typeof value === "string" ? Number.parseInt(value) || 0 : (value as number),
          },
        }))
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setHasChanges(true)
      const newImages = Array.from(files).map(
        (file, index) => `/placeholder.svg?height=200&width=200&text=Product+${images.length + index + 1}`,
      )
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setHasChanges(true)
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setHasChanges(true)
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setHasChanges(true)
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (status?: ProductStatus) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedData = {
      ...formData,
      ...(status && { status }),
      images,
      updatedAt: new Date().toISOString().split("T")[0],
    }

    console.log("Updating product:", updatedData)

    setIsSubmitting(false)
    setHasChanges(false)
    router.push("/seller/products")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container flex flex-col py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/seller/products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
              <p className="text-gray-600 mt-1">Update product information and settings</p>
            </div>
          </div>

          {hasChanges && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              Unsaved Changes
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Product Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{formData.sales.totalSold}</div>
                    <div className="text-sm text-gray-600">Total Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">${formData.sales.revenue.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{formData.sales.views.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{formData.sales.conversionRate}%</div>
                    <div className="text-sm text-gray-600">Conversion</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed product description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea
                    id="shortDescription"
                    placeholder="Brief product summary"
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                    rows={2}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      placeholder="Product brand"
                      value={formData.brand}
                      onChange={(e) => handleInputChange("brand", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {index === 0 && <Badge className="absolute top-2 left-2 bg-blue-600">Main</Badge>}
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}

                  <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Add Image</span>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
                <p className="text-sm text-gray-600">
                  Upload up to 10 images. First image will be the main product image.
                </p>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="comparePrice">Compare at Price</Label>
                    <Input
                      id="comparePrice"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.comparePrice}
                      onChange={(e) => handleInputChange("comparePrice", Number.parseFloat(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cost">Cost per Item</Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.cost}
                      onChange={(e) => handleInputChange("cost", Number.parseFloat(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Inventory
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      placeholder="Product SKU"
                      value={formData.sku}
                      onChange={(e) => handleInputChange("sku", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="0"
                      value={formData.stock}
                      onChange={(e) => handleInputChange("stock", Number.parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Track Quantity</Label>
                    <p className="text-sm text-gray-600">Track this product&apos;s inventory</p>
                  </div>
                  <Switch
                    checked={formData.trackQuantity}
                    onCheckedChange={(checked) => handleInputChange("trackQuantity", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Continue selling when out of stock</Label>
                    <p className="text-sm text-gray-600">Allow customers to purchase when inventory reaches zero</p>
                  </div>
                  <Switch
                    checked={formData.continueSellingWhenOutOfStock}
                    onCheckedChange={(checked) => handleInputChange("continueSellingWhenOutOfStock", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Shipping
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", Number.parseFloat(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="length">Length (cm)</Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="0"
                      value={formData.dimensions.length}
                      onChange={(e) => handleInputChange("dimensions.length", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="width">Width (cm)</Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="0"
                      value={formData.dimensions.width}
                      onChange={(e) => handleInputChange("dimensions.width", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="0"
                      value={formData.dimensions.height}
                      onChange={(e) => handleInputChange("dimensions.height", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO */}
            <Card>
              <CardHeader>
                <CardTitle>Search Engine Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    placeholder="SEO title for search engines"
                    value={formData.seoTitle}
                    onChange={(e) => handleInputChange("seoTitle", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    placeholder="SEO description for search engines"
                    value={formData.seoDescription}
                    onChange={(e) => handleInputChange("seoDescription", e.target.value)}
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Status */}
            <Card>
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={formData.status}
                  onValueChange={(value: ProductStatus) => handleInputChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {new Date(formData.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Updated: {new Date(formData.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Product Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button onClick={addTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="ml-1 hover:text-red-600">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting || !formData.name || !formData.price}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Updating..." : "Update Product"}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleSubmit("draft")}
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save as Draft
                  </Button>

                  <Separator />

                  <Button variant="ghost" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Product
                  </Button>

                  <Button variant="ghost" className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
