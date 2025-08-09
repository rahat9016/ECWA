"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Heart,
  ShoppingCart,
  Trash2,
  Eye,
  Share2,
  Grid3X3,
  List,
  Search,
  ArrowLeft,
  Check,
  Star,
  Plus,
  Minus,
  Package,
  AlertCircle,
  DollarSign,
  TrendingUp,
  ShoppingBag,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
// import { toast } from "@/components/ui/use-toast"

// Sample wishlist data
const WISHLIST_ITEMS = [
  {
    id: 1,
    name: "Premium Wireless Bluetooth Headphones",
    brand: "TechSound Pro",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 2847,
    image: "/placeholder.svg?height=400&width=400&text=Headphones",
    category: "Electronics",
    subcategory: "Audio",
    inStock: true,
    stockCount: 15,
    addedDate: "2024-01-15",
    priceHistory: [
      { date: "2024-01-01", price: 399.99 },
      { date: "2024-01-10", price: 349.99 },
      { date: "2024-01-15", price: 299.99 },
    ],
    badge: "Best Seller",
    colors: ["Black", "White", "Gray"],
    sizes: ["One Size"],
    description: "Premium wireless headphones with active noise cancellation and 40-hour battery life.",
  },
  {
    id: 2,
    name: "Designer Leather Handbag",
    brand: "LuxeFashion",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviews: 892,
    image: "/placeholder.svg?height=400&width=400&text=Handbag",
    category: "Fashion",
    subcategory: "Bags",
    inStock: true,
    stockCount: 8,
    addedDate: "2024-01-12",
    priceHistory: [
      { date: "2024-01-01", price: 249.99 },
      { date: "2024-01-12", price: 189.99 },
    ],
    badge: "Limited Edition",
    colors: ["Brown", "Black", "Tan"],
    sizes: ["One Size"],
    description: "Handcrafted leather handbag with premium hardware and spacious interior.",
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    brand: "FitTech",
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.7,
    reviews: 2156,
    image: "/placeholder.svg?height=400&width=400&text=Watch",
    category: "Electronics",
    subcategory: "Wearables",
    inStock: false,
    stockCount: 0,
    addedDate: "2024-01-10",
    priceHistory: [
      { date: "2024-01-01", price: 299.99 },
      { date: "2024-01-10", price: 249.99 },
    ],
    badge: "New",
    colors: ["Black", "Silver", "Rose Gold"],
    sizes: ["38mm", "42mm"],
    description: "Advanced fitness tracking with heart rate monitoring and GPS.",
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    brand: "EcoWear",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.6,
    reviews: 634,
    image: "/placeholder.svg?height=400&width=400&text=T-Shirt",
    category: "Fashion",
    subcategory: "Clothing",
    inStock: true,
    stockCount: 25,
    addedDate: "2024-01-08",
    priceHistory: [
      { date: "2024-01-01", price: 59.99 },
      { date: "2024-01-08", price: 39.99 },
    ],
    badge: "Eco-Friendly",
    colors: ["White", "Black", "Navy", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Sustainable organic cotton t-shirt with comfortable fit.",
  },
  {
    id: 5,
    name: "Professional Camera Lens",
    brand: "PhotoPro",
    price: 899.99,
    originalPrice: 999.99,
    rating: 4.9,
    reviews: 456,
    image: "/placeholder.svg?height=400&width=400&text=Camera+Lens",
    category: "Electronics",
    subcategory: "Photography",
    inStock: true,
    stockCount: 5,
    addedDate: "2024-01-05",
    priceHistory: [
      { date: "2024-01-01", price: 999.99 },
      { date: "2024-01-05", price: 899.99 },
    ],
    badge: "Pro Choice",
    colors: ["Black"],
    sizes: ["85mm"],
    description: "Professional-grade camera lens with superior optical quality.",
  },
  {
    id: 6,
    name: "Minimalist Desk Lamp",
    brand: "ModernHome",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviews: 234,
    image: "/placeholder.svg?height=400&width=400&text=Desk+Lamp",
    category: "Home & Living",
    subcategory: "Lighting",
    inStock: true,
    stockCount: 12,
    addedDate: "2024-01-03",
    priceHistory: [
      { date: "2024-01-01", price: 99.99 },
      { date: "2024-01-03", price: 79.99 },
    ],
    badge: "Design Award",
    colors: ["White", "Black", "Silver"],
    sizes: ["One Size"],
    description: "Sleek minimalist desk lamp with adjustable brightness and USB charging.",
  },
]

type ViewMode = "grid" | "list"
type SortOption = "newest" | "oldest" | "price-low" | "price-high" | "name" | "rating"

interface WishlistItem {
  id: number
  name: string
  brand: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  category: string
  subcategory: string
  inStock: boolean
  stockCount: number
  addedDate: string
  priceHistory: { date: string; price: number }[]
  badge: string
  colors: string[]
  sizes: string[]
  description: string
}

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(WISHLIST_ITEMS)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showOutOfStock, setShowOutOfStock] = useState(true)
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [quantities, setQuantities] = useState<Record<number, number>>({})

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(wishlistItems.map((item) => item.category)))
    return ["all", ...cats]
  }, [wishlistItems])

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    const filtered = wishlistItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = filterCategory === "all" || item.category === filterCategory
      const matchesStock = showOutOfStock || item.inStock

      return matchesSearch && matchesCategory && matchesStock
    })

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
        case "oldest":
          return new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime()
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

    return filtered
  }, [wishlistItems, searchQuery, filterCategory, showOutOfStock, sortBy])

  // Statistics
  const stats = useMemo(() => {
    const totalItems = wishlistItems.length
    const inStockItems = wishlistItems.filter((item) => item.inStock).length
    const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0)
    const totalSavings = wishlistItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0)

    return { totalItems, inStockItems, totalValue, totalSavings }
  }, [wishlistItems])

  const handleSelectAll = () => {
    if (selectedItems.length === filteredAndSortedItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredAndSortedItems.map((item) => item.id))
    }
  }

  const handleSelectItem = (itemId: number) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const handleRemoveSelected = () => {
    setWishlistItems((prev) => prev.filter((item) => !selectedItems.includes(item.id)))
    setSelectedItems([])
    setIsSelectMode(false)
    // toast({
    //   title: "Items Removed",
    //   description: `${selectedItems.length} items removed from wishlist`,
    // })
  }

  const handleRemoveItem = (itemId: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId))
    setSelectedItems((prev) => prev.filter((id) => id !== itemId))
    // toast({
    //   title: "Item Removed",
    //   description: "Item removed from wishlist",
    // })
  }

  const handleAddToCart = (itemId: number, quantity = 1) => {
    // Add to cart logic here
    // toast({
    //   title: "Added to Cart",
    //   description: `Item added to cart with quantity ${quantity}`,
    // })
    console.log(itemId, quantity);
  }

  const handleAddSelectedToCart = () => {
    const selectedItemsData = wishlistItems.filter((item) => selectedItems.includes(item.id))
    let totalQuantity = 0
    console.log(totalQuantity);
    selectedItemsData.forEach((item) => {
      const quantity = quantities[item.id] || 1
      totalQuantity += quantity
      handleAddToCart(item.id, quantity)
    })

    setSelectedItems([])
    setIsSelectMode(false)
    // toast({
    //   title: "Added to Cart",
    //   description: `${selectedItemsData.length} items added to cart (${totalQuantity} total quantity)`,
    // })
  }

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity >= 1 && quantity <= 10) {
      setQuantities((prev) => ({ ...prev, [itemId]: quantity }))
    }
  }

  const getItemQuantity = (itemId: number) => quantities[itemId] || 1

  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredAndSortedItems.map((item) => {
        const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
        const isSelected = selectedItems.includes(item.id)
        const quantity = getItemQuantity(item.id)

        return (
          <Card
            key={item.id}
            className={`group overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
              isSelected ? "ring-2 ring-blue-500 shadow-lg" : ""
            } ${!item.inStock ? "opacity-75" : ""}`}
          >
            <CardContent className="p-0">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />

                {/* Overlay for out of stock */}
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge className="bg-red-500 text-white text-sm px-3 py-1">Out of Stock</Badge>
                  </div>
                )}

                {/* Selection checkbox */}
                {isSelectMode && (
                  <div className="absolute top-3 left-3 z-10">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleSelectItem(item.id)}
                      className="bg-white/90 backdrop-blur-sm border-2"
                    />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  {discount > 0 && <Badge className="bg-red-500 text-white shadow-lg">-{discount}%</Badge>}
                  {item.badge && (
                    <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
                      {item.badge}
                    </Badge>
                  )}
                </div>

                {/* Action buttons */}
                <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-10 h-10 p-0 bg-white/90 backdrop-blur-sm border-0 hover:bg-white shadow-lg"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-10 h-10 p-0 bg-white/90 backdrop-blur-sm border-0 hover:bg-white shadow-lg"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-10 h-10 p-0 bg-white/90 backdrop-blur-sm border-0 hover:bg-white shadow-lg"
                  >
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>

                {/* Stock indicator */}
                {item.inStock && item.stockCount <= 5 && (
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-orange-500 text-white text-xs">Only {item.stockCount} left</Badge>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {item.brand}
                  </Badge>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({item.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-gray-900">${item.price}</span>
                  {item.originalPrice > item.price && (
                    <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                  )}
                </div>

                {/* Quantity selector for selected items */}
                {isSelected && (
                  <div className="flex items-center gap-2 mb-4">
                    <Label className="text-sm font-medium">Qty:</Label>
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, quantity - 1)}
                        disabled={quantity <= 1}
                        className="p-1 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, quantity + 1)}
                        disabled={quantity >= 10}
                        className="p-1 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 shadow-lg"
                    disabled={!item.inStock}
                    onClick={() => handleAddToCart(item.id, quantity)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add to Cart
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemoveItem(item.id)}
                    className="px-3 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                  >
                    <Heart className="w-4 h-4 fill-red-500" />
                  </Button>
                </div>

                <div className="mt-3 text-xs text-gray-500">Added {new Date(item.addedDate).toLocaleDateString()}</div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )

  const ListView = () => (
    <div className="space-y-4">
      {filteredAndSortedItems.map((item) => {
        const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
        const isSelected = selectedItems.includes(item.id)
        const quantity = getItemQuantity(item.id)

        return (
          <Card
            key={item.id}
            className={`transition-all duration-300 hover:shadow-lg ${
              isSelected ? "ring-2 ring-blue-500 shadow-lg" : ""
            } ${!item.inStock ? "opacity-75" : ""}`}
          >
            <CardContent className="p-6">
              <div className="flex gap-6">
                {/* Selection checkbox */}
                {isSelectMode && (
                  <div className="flex items-center">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleSelectItem(item.id)}
                      className="border-2"
                    />
                  </div>
                )}

                {/* Product Image */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                      <Badge className="bg-red-500 text-white text-xs">Out of Stock</Badge>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {item.brand}
                        </Badge>
                        {item.badge && (
                          <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs">
                            {item.badge}
                          </Badge>
                        )}
                        {discount > 0 && <Badge className="bg-red-500 text-white text-xs">-{discount}%</Badge>}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({item.reviews} reviews)</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">${item.price}</span>
                        {item.originalPrice > item.price && (
                          <span className="text-lg text-gray-500 line-through">${item.originalPrice}</span>
                        )}
                      </div>

                      {item.inStock && item.stockCount <= 5 && (
                        <Badge className="bg-orange-500 text-white text-xs">Only {item.stockCount} left</Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity selector for selected items */}
                      {isSelected && (
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-medium">Qty:</Label>
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              onClick={() => updateQuantity(item.id, quantity - 1)}
                              disabled={quantity <= 1}
                              className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-medium min-w-[60px] text-center">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, quantity + 1)}
                              disabled={quantity >= 10}
                              className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      <Button
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 shadow-lg"
                        disabled={!item.inStock}
                        onClick={() => handleAddToCart(item.id, quantity)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>

                      <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-900 bg-transparent">
                        <Eye className="w-4 h-4" />
                      </Button>

                      <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-900 bg-transparent">
                        <Share2 className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-gray-500">
                    Added on {new Date(item.addedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Heart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h1>
              <p className="text-gray-600 mb-6">
                Start adding items to your wishlist to keep track of products you love.
              </p>
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 shadow-lg"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold mb-1">Save Favorites</h3>
                <p className="text-sm text-gray-600">Keep track of items you love</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-semibold mb-1">Price Tracking</h3>
                <p className="text-sm text-gray-600">Get notified of price drops</p>
              </div>
              <div className="text-center">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-semibold mb-1">Easy Shopping</h3>
                <p className="text-sm text-gray-600">Add multiple items to cart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container  flex flex-col mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="bg-black/10 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600">
              {stats.totalItems} {stats.totalItems === 1 ? "item" : "items"} • {stats.inStockItems} in stock
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalItems}</div>
              <div className="text-sm text-gray-600">Total Items</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Check className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-gray-900">{stats.inStockItems}</div>
              <div className="text-sm text-gray-600">In Stock</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-gray-900">${stats.totalValue.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Total Value</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-gray-900">${stats.totalSavings.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Total Savings</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search wishlist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="show-out-of-stock" checked={showOutOfStock} onCheckedChange={()=>setShowOutOfStock((prev)=> !prev)} />
                <Label htmlFor="show-out-of-stock" className="text-sm">
                  Show out of stock
                </Label>
              </div>

              <Separator orientation="vertical" className="h-6" />

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="bg-transparent"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="bg-transparent"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              <Button
                variant={isSelectMode ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setIsSelectMode(!isSelectMode)
                  if (!isSelectMode) setSelectedItems([])
                }}
                className="bg-transparent"
              >
                <Check className="w-4 h-4 mr-2" />
                Select
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          {isSelectMode && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" onClick={handleSelectAll} className="bg-transparent">
                    {selectedItems.length === filteredAndSortedItems.length ? "Deselect All" : "Select All"}
                  </Button>
                  {selectedItems.length > 0 && (
                    <span className="text-sm text-gray-600">
                      {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"} selected
                    </span>
                  )}
                </div>

                {selectedItems.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleAddSelectedToCart}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 shadow-lg"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart ({selectedItems.length})
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleRemoveSelected}
                      className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Selected
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedItems.length} of {wishlistItems.length} items
          </p>
          {filteredAndSortedItems.length === 0 && searchQuery && (
            <div className="flex items-center gap-2 text-orange-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">No items match your search</span>
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        {filteredAndSortedItems.length > 0 ? (
          viewMode === "grid" ? (
            <GridView />
          ) : (
            <ListView />
          )
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setFilterCategory("all")
                setShowOutOfStock(true)
              }}
              className="bg-transparent"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
