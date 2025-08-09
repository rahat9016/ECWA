"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag, Truck, Shield, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Sample cart data
const INITIAL_CART_ITEMS = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    brand: "TechSound",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    quantity: 2,
    inStock: true,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    brand: "EcoWear",
    price: 24.99,
    originalPrice: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    quantity: 1,
    inStock: true,
    category: "Clothing",
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    brand: "FitTech",
    price: 199.99,
    originalPrice: 249.99,
    image: "/placeholder.svg?height=300&width=300",
    quantity: 1,
    inStock: true,
    category: "Electronics",
  },
]

const SHIPPING_OPTIONS = [
  { id: "standard", name: "Standard Shipping", price: 5.99, days: "5-7 business days" },
  { id: "express", name: "Express Shipping", price: 12.99, days: "2-3 business days" },
  { id: "overnight", name: "Overnight Shipping", price: 24.99, days: "Next business day" },
]

export default function Cart() {
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
  const [selectedShipping, setSelectedShipping] = useState("standard")
  const [giftWrap, setGiftWrap] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: Math.min(newQuantity, 10) } : item)),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyCoupon = () => {
    // Simulate coupon validation
    const validCoupons = {
      SAVE10: 10,
      WELCOME20: 20,
      STUDENT15: 15,
    }

    if (validCoupons[couponCode as keyof typeof validCoupons]) {
      setAppliedCoupon({
        code: couponCode,
        discount: validCoupons[couponCode as keyof typeof validCoupons],
      })
      setCouponCode("")
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  const calculations = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const savings = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0)
    const couponDiscount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0
    const shipping = SHIPPING_OPTIONS.find((option) => option.id === selectedShipping)?.price || 0
    const giftWrapFee = giftWrap ? 4.99 : 0
    const tax = (subtotal - couponDiscount + shipping + giftWrapFee) * 0.08 // 8% tax
    const total = subtotal - couponDiscount + shipping + giftWrapFee + tax

    return {
      subtotal,
      savings,
      couponDiscount,
      shipping,
      giftWrapFee,
      tax,
      total,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    }
  }, [cartItems, appliedCoupon, selectedShipping, giftWrap])

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-4" />
              <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
              <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added any items to your cart yet.</p>
              <Link href="/">
                <Button size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over $50</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">100% secure checkout</p>
              </div>
              <div className="text-center">
                <CreditCard className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container  flex flex-col mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="bg-gray-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {calculations.itemCount} {calculations.itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)

              return (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="relative w-full sm:w-32 h-32 shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                        {discount > 0 && (
                          <Badge variant="destructive" className="absolute -top-2 -right-2">
                            -{discount}%
                          </Badge>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.brand}</p>
                            <Badge variant="secondary" className="mt-1">
                              {item.category}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">${item.price}</span>
                            {item.originalPrice > item.price && (
                              <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <Label htmlFor={`quantity-${item.id}`} className="text-sm">
                              Qty:
                            </Label>
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <Input
                                id={`quantity-${item.id}`}
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                                className="w-16 h-8 text-center border-0 focus-visible:ring-0"
                                min="1"
                                max="10"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= 10}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="text-right min-w-[80px]">
                              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                              {item.originalPrice > item.price && (
                                <p className="text-xs text-muted-foreground line-through">
                                  ${(item.originalPrice * item.quantity).toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Promo Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-md border border-green-200">
                    <div>
                      <p className="font-medium text-green-800">{appliedCoupon.code}</p>
                      <p className="text-sm text-green-600">{appliedCoupon.discount}% discount applied</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={removeCoupon} className="text-green-800">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    />
                    <Button onClick={applyCoupon} disabled={!couponCode}>
                      Apply
                    </Button>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">Try: SAVE10, WELCOME20, or STUDENT15</p>
              </CardContent>
            </Card>

            {/* Shipping Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Shipping Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedShipping} onValueChange={setSelectedShipping}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SHIPPING_OPTIONS.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        <div className="flex justify-between items-center w-full">
                          <div>
                            <p className="font-medium">{option.name}</p>
                            <p className="text-sm text-muted-foreground">{option.days}</p>
                          </div>
                          <span className="font-medium">${option.price}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Gift Wrap */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="gift-wrap" checked={giftWrap} onCheckedChange={(checked)=>setGiftWrap(checked as boolean)} />
                  <Label htmlFor="gift-wrap" className="flex-1">
                    <div className="flex justify-between">
                      <span>Gift wrap</span>
                      <span className="font-medium">$4.99</span>
                    </div>
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({calculations.itemCount} items)</span>
                    <span>${calculations.subtotal.toFixed(2)}</span>
                  </div>

                  {calculations.savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>You saved</span>
                      <span>-${calculations.savings.toFixed(2)}</span>
                    </div>
                  )}

                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon ({appliedCoupon.code})</span>
                      <span>-${calculations.couponDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${calculations.shipping.toFixed(2)}</span>
                  </div>

                  {giftWrap && (
                    <div className="flex justify-between">
                      <span>Gift wrap</span>
                      <span>${calculations.giftWrapFee.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${calculations.tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${calculations.total.toFixed(2)}</span>
                </div>

                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 border rounded-lg">
                <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders $50+</p>
              </div>
              <div className="p-4 border rounded-lg">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">30-Day Returns</p>
                <p className="text-xs text-muted-foreground">Easy returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
