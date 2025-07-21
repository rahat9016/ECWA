"use client"

import type React from "react"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  MapPin,
  Package,
  Shield,
  Truck,
  Mail,
  Plus,
  Home,
  Building2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import type {
  SavedAddress,
  CreditCardInfo,
  OrderSummary,
  CheckoutState,
  FormErrors,
  NewAddressForm,
  AddressFormErrors,
} from "@/types/checkout"
import { CART_ITEMS, PAYMENT_METHODS, SAVED_ADDRESSES, SHIPPING_OPTIONS, US_STATES } from "@/docs/checkout"


export default function Checkout() {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState<boolean>(false)
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>(SAVED_ADDRESSES)
  const [newAddressForm, setNewAddressForm] = useState<NewAddressForm>({
    label: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    phone: "",
    isDefault: false,
  })
  const [addressFormErrors, setAddressFormErrors] = useState<AddressFormErrors>({})

  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    currentStep: 0,
    selectedAddressId: SAVED_ADDRESSES.find((addr) => addr.isDefault)?.id || SAVED_ADDRESSES[0]?.id || "",
    selectedShipping: "standard",
    selectedPayment: "credit",
    creditCardInfo: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    },
    giftWrap: false,
    specialInstructions: "",
    marketingOptIn: false,
    email: "john.doe@example.com", // This could come from user session
  })

  const selectedAddress = savedAddresses.find((addr) => addr.id === checkoutState.selectedAddressId)

  const orderSummary: OrderSummary = useMemo(() => {
    const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const savings = CART_ITEMS.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0)
    const couponDiscount = 0 // Could be passed from cart
    const shipping = SHIPPING_OPTIONS.find((option) => option.id === checkoutState.selectedShipping)?.price || 0
    const giftWrapFee = checkoutState.giftWrap ? 4.99 : 0
    const tax = (subtotal - couponDiscount + shipping + giftWrapFee) * 0.08
    const total = subtotal - couponDiscount + shipping + giftWrapFee + tax

    return {
      subtotal,
      savings,
      couponDiscount,
      shipping,
      giftWrapFee,
      tax,
      total,
      itemCount: CART_ITEMS.reduce((sum, item) => sum + item.quantity, 0),
    }
  }, [checkoutState.selectedShipping, checkoutState.giftWrap])

  const steps: { title: string; description: string; icon: React.ReactNode }[] = [
    {
      title: "Shipping",
      description: "Select address and shipping method",
      icon: <Truck className="w-5 h-5" />,
    },
    {
      title: "Payment",
      description: "Choose your payment method",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      title: "Review",
      description: "Review your order",
      icon: <Package className="w-5 h-5" />,
    },
  ]

  const validateNewAddressForm = (): boolean => {
    const newErrors: AddressFormErrors = {}

    // Required field validations
    if (!newAddressForm.label.trim()) {
      newErrors.label = "Address label is required"
    } else if (newAddressForm.label.trim().length < 2) {
      newErrors.label = "Address label must be at least 2 characters"
    }

    if (!newAddressForm.firstName.trim()) {
      newErrors.firstName = "First name is required"
    } else if (newAddressForm.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters"
    }

    if (!newAddressForm.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    } else if (newAddressForm.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters"
    }

    if (!newAddressForm.address.trim()) {
      newErrors.address = "Street address is required"
    } else if (newAddressForm.address.trim().length < 5) {
      newErrors.address = "Please enter a complete street address"
    }

    if (!newAddressForm.city.trim()) {
      newErrors.city = "City is required"
    } else if (newAddressForm.city.trim().length < 2) {
      newErrors.city = "City name must be at least 2 characters"
    }

    if (!newAddressForm.state) {
      newErrors.state = "State is required"
    }

    if (!newAddressForm.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required"
    } else if (!/^\d{5}(-\d{4})?$/.test(newAddressForm.zipCode.trim())) {
      newErrors.zipCode = "Please enter a valid ZIP code (12345 or 12345-6789)"
    }

    // Optional phone validation
    if (newAddressForm.phone && newAddressForm.phone.trim()) {
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$|^[$$]?[\d\s\-($$]{10,}$/
      if (!phoneRegex.test(newAddressForm.phone.replace(/[\s\-$$$$]/g, ""))) {
        newErrors.phone = "Please enter a valid phone number"
      }
    }

    setAddressFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const updateNewAddressForm = (field: keyof NewAddressForm, value: string | boolean): void => {
    let processedValue = value

    // Format phone number
    if (field === "phone" && typeof value === "string") {
      // Remove all non-digits
      const digits = value.replace(/\D/g, "")

      // Format as (XXX) XXX-XXXX
      if (digits.length >= 6) {
        processedValue = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
      } else if (digits.length >= 3) {
        processedValue = `(${digits.slice(0, 3)}) ${digits.slice(3)}`
      } else {
        processedValue = digits
      }
    }

    // Format ZIP code
    if (field === "zipCode" && typeof value === "string") {
      // Allow only digits and hyphen, format as XXXXX-XXXX
      const cleaned = value.replace(/[^\d-]/g, "")
      if (cleaned.length > 5 && !cleaned.includes("-")) {
        processedValue = `${cleaned.slice(0, 5)}-${cleaned.slice(5, 9)}`
      } else {
        processedValue = cleaned.slice(0, 10) // Limit to 10 characters max
      }
    }

    setNewAddressForm((prev) => ({
      ...prev,
      [field]: processedValue,
    }))

    // Clear error when user starts typing
    if (addressFormErrors[field]) {
      setAddressFormErrors((prev: AddressFormErrors) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSaveNewAddress = (): void => {
    if (validateNewAddressForm()) {
      const newAddress: SavedAddress = {
        id: `addr_${Date.now()}`,
        ...newAddressForm,
      }

      // If this is set as default, remove default from others
      let updatedAddresses = savedAddresses
      if (newAddress.isDefault) {
        updatedAddresses = savedAddresses.map((addr) => ({ ...addr, isDefault: false }))
      }

      setSavedAddresses([...updatedAddresses, newAddress])
      setCheckoutState((prev) => ({ ...prev, selectedAddressId: newAddress.id }))

      // Reset form and close dialog
      setNewAddressForm({
        label: "",
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zipCode: "",
        country: "US",
        phone: "",
        isDefault: false,
      })
      setAddressFormErrors({})
      setIsAddressDialogOpen(false)
    }
  }

  const resetNewAddressForm = (): void => {
    setNewAddressForm({
      label: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
      phone: "",
      isDefault: false,
    })
    setAddressFormErrors({})
  }

  const validateShippingStep = (): boolean => {
    const newErrors: FormErrors = {}

    if (!checkoutState.selectedAddressId) {
      newErrors.address = "Please select a shipping address"
    }
    if (!checkoutState.selectedShipping) {
      newErrors.shipping = "Please select a shipping method"
    }
    if (!checkoutState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(checkoutState.email)) {
      newErrors.email = "Email is invalid"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePaymentForm = (): boolean => {
    const newErrors: FormErrors = {}
    const { creditCardInfo, selectedPayment } = checkoutState

    if (selectedPayment === "credit" || selectedPayment === "debit") {
      if (!creditCardInfo.cardholderName.trim()) newErrors.cardholderName = "Cardholder name is required"
      if (!creditCardInfo.cardNumber.trim()) newErrors.cardNumber = "Card number is required"
      else if (creditCardInfo.cardNumber.replace(/\s/g, "").length < 13) newErrors.cardNumber = "Card number is invalid"
      if (!creditCardInfo.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required"
      if (!creditCardInfo.cvv.trim()) newErrors.cvv = "CVV is required"
      else if (creditCardInfo.cvv.length < 3) newErrors.cvv = "CVV is invalid"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = async (): Promise<void> => {
    let isValid = true

    if (currentStep === 0) {
      isValid = validateShippingStep()
    } else if (currentStep === 1) {
      isValid = validatePaymentForm()
    }

    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        // Process order
        setIsLoading(true)
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 2000))
          setCurrentStep(currentStep + 1) // Go to confirmation
        } catch (error) {
          console.error("Order processing failed:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }
  }

  const handleBack = (): void => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateCreditCardInfo = (field: keyof CreditCardInfo, value: string): void => {
    let formattedValue = value

    // Format card number
    if (field === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
    }
    // Format expiry date
    else if (field === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substr(0, 5)
    }
    // Format CVV
    else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").substr(0, 4)
    }

    setCheckoutState((prev:CheckoutState) => ({
      ...prev,
      creditCardInfo: {
        ...prev.creditCardInfo,
        [field]: formattedValue,
      },
    }))

    if (errors[field]) {
      setErrors((prev: FormErrors) => ({ ...prev, [field]: "" }))
    }
  }

  const ShippingStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Shipping Details</h2>
        <p className="text-muted-foreground">Select your shipping address and delivery method</p>
      </div>

      {/* Email Address */}
      <div>
        <Label htmlFor="email">Email Address *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="email"
            type="email"
            value={checkoutState.email}
            onChange={(e) => {
              setCheckoutState((prev:CheckoutState) => ({ ...prev, email: e.target.value }))
              if (errors.email) {
                setErrors((prev:FormErrors) => ({ ...prev, email: "" }))
              }
            }}
            className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
            placeholder="john.doe@example.com"
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        <p className="text-sm text-muted-foreground mt-1">Order confirmation will be sent to this email</p>
      </div>

      {/* Address Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Label className="text-base font-semibold">Shipping Address *</Label>
          <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => resetNewAddressForm()}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-w-[95vw] p-0">
              <div className="flex flex-col max-h-[85vh]">
                <DialogHeader className="px-6 py-4 border-b">
                  <DialogTitle className="text-xl font-semibold">Add New Address</DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    Add a new shipping address to your account
                  </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div className="space-y-6">
                    {/* Address Label */}
                    <div className="space-y-2">
                      <Label htmlFor="newLabel" className="text-sm font-medium">
                        Address Label *
                      </Label>
                      <Input
                        id="newLabel"
                        value={newAddressForm.label}
                        onChange={(e) => updateNewAddressForm("label", e.target.value)}
                        className={`h-10 ${addressFormErrors.label ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        placeholder="e.g., Home, Work, Mom's House"
                      />
                      {addressFormErrors.label && (
                        <p className="text-xs text-red-500 mt-1">{addressFormErrors.label}</p>
                      )}
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newFirstName" className="text-sm font-medium">
                          First Name *
                        </Label>
                        <Input
                          id="newFirstName"
                          value={newAddressForm.firstName}
                          onChange={(e) => updateNewAddressForm("firstName", e.target.value)}
                          className={`h-10 ${addressFormErrors.firstName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          placeholder="John"
                        />
                        {addressFormErrors.firstName && (
                          <p className="text-xs text-red-500 mt-1">{addressFormErrors.firstName}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newLastName" className="text-sm font-medium">
                          Last Name *
                        </Label>
                        <Input
                          id="newLastName"
                          value={newAddressForm.lastName}
                          onChange={(e) => updateNewAddressForm("lastName", e.target.value)}
                          className={`h-10 ${addressFormErrors.lastName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          placeholder="Doe"
                        />
                        {addressFormErrors.lastName && (
                          <p className="text-xs text-red-500 mt-1">{addressFormErrors.lastName}</p>
                        )}
                      </div>
                    </div>

                    {/* Address Fields */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="newAddress" className="text-sm font-medium">
                          Street Address *
                        </Label>
                        <Input
                          id="newAddress"
                          value={newAddressForm.address}
                          onChange={(e) => updateNewAddressForm("address", e.target.value)}
                          className={`h-10 ${addressFormErrors.address ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          placeholder="123 Main Street"
                        />
                        {addressFormErrors.address && (
                          <p className="text-xs text-red-500 mt-1">{addressFormErrors.address}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newApartment" className="text-sm font-medium">
                          Apartment, Suite, etc. <span className="text-muted-foreground">(Optional)</span>
                        </Label>
                        <Input
                          id="newApartment"
                          value={newAddressForm.apartment || ""}
                          onChange={(e) => updateNewAddressForm("apartment", e.target.value)}
                          className="h-10"
                          placeholder="Apt 4B, Suite 100, etc."
                        />
                      </div>
                    </div>

                    {/* City, State, ZIP */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newCity" className="text-sm font-medium">
                          City *
                        </Label>
                        <Input
                          id="newCity"
                          value={newAddressForm.city}
                          onChange={(e) => updateNewAddressForm("city", e.target.value)}
                          className={`h-10 ${addressFormErrors.city ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          placeholder="New York"
                        />
                        {addressFormErrors.city && (
                          <p className="text-xs text-red-500 mt-1">{addressFormErrors.city}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newState" className="text-sm font-medium">
                          State *
                        </Label>
                        <Select
                          value={newAddressForm.state}
                          onValueChange={(value) => updateNewAddressForm("state", value)}
                        >
                          <SelectTrigger
                            className={`h-10 ${addressFormErrors.state ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          >
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {US_STATES.map((state:string) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {addressFormErrors.state && (
                          <p className="text-xs text-red-500 mt-1">{addressFormErrors.state}</p>
                        )}
                      </div>

                      <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                        <Label htmlFor="newZipCode" className="text-sm font-medium">
                          ZIP Code *
                        </Label>
                        <Input
                          id="newZipCode"
                          value={newAddressForm.zipCode}
                          onChange={(e) => updateNewAddressForm("zipCode", e.target.value)}
                          className={`h-10 ${addressFormErrors.zipCode ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          placeholder="10001"
                          maxLength={10}
                        />
                        {addressFormErrors.zipCode && (
                          <p className="text-xs text-red-500 mt-1">{addressFormErrors.zipCode}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="newPhone" className="text-sm font-medium">
                        Phone Number <span className="text-muted-foreground">(Optional)</span>
                      </Label>
                      <Input
                        id="newPhone"
                        type="tel"
                        value={newAddressForm.phone || ""}
                        onChange={(e) => updateNewAddressForm("phone", e.target.value)}
                        className="h-10"
                        placeholder="(555) 123-4567"
                      />
                      <p className="text-xs text-muted-foreground">For delivery notifications and updates</p>
                    </div>

                    {/* Default Address Checkbox */}
                    <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg border">
                      <Checkbox
                        id="newIsDefault"
                        checked={newAddressForm.isDefault}
                        onCheckedChange={(checked) => updateNewAddressForm("isDefault", checked as boolean)}
                        className="mt-0.5"
                      />
                      <div className="space-y-1">
                        <Label htmlFor="newIsDefault" className="text-sm font-medium cursor-pointer">
                          Set as default shipping address
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          This address will be selected by default for future orders
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dialog Footer */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 px-6 py-4 border-t bg-muted/20">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddressDialogOpen(false)
                      resetNewAddressForm()
                    }}
                    className="order-2 sm:order-1"
                  >
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleSaveNewAddress} className="order-1 sm:order-2">
                    Save Address
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <RadioGroup
          value={checkoutState.selectedAddressId}
          onValueChange={(value:string) => {
            setCheckoutState((prev:CheckoutState) => ({ ...prev, selectedAddressId: value }))
            if (errors.address) {
              setErrors((prev:FormErrors) => ({ ...prev, address: "" }))
            }
          }}
          className="space-y-3"
        >
          {savedAddresses.map((address) => (
            <div key={address.id} className="relative">
              <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{address.label}</span>
                      {address.isDefault && <Badge variant="secondary">Default</Badge>}
                    </div>
                    <p className="text-sm">
                      {address.firstName} {address.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.address}
                      {address.apartment && `, ${address.apartment}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    {address.phone && <p className="text-sm text-muted-foreground">{address.phone}</p>}
                  </div>
                </Label>
                <div className="flex items-center gap-1">
                  {address.label.toLowerCase().includes("home") && <Home className="w-4 h-4 text-muted-foreground" />}
                  {address.label.toLowerCase().includes("work") && (
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                  )}
                  {!address.label.toLowerCase().includes("home") && !address.label.toLowerCase().includes("work") && (
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      {/* Shipping Options */}
      <div>
        <Label className="text-base font-semibold">Shipping Method *</Label>
        <RadioGroup
          value={checkoutState.selectedShipping}
          onValueChange={(value:string) => {
            setCheckoutState((prev:CheckoutState) => ({ ...prev, selectedShipping: value }))
            if (errors.shipping) {
              setErrors((prev:FormErrors) => ({ ...prev, shipping: "" }))
            }
          }}
          className="mt-3 space-y-3"
        >
          {SHIPPING_OPTIONS.map((option) => (
            <div
              key={option.id}
              className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{option.name}</p>
                    <p className="text-sm text-muted-foreground">{option.days}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">${option.price}</span>
                    {option.id === "standard" && option.price === 5.99 && orderSummary.subtotal >= 50 && (
                      <div className="text-xs text-green-600">FREE on orders $50+</div>
                    )}
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.shipping && <p className="text-red-500 text-sm mt-1">{errors.shipping}</p>}
      </div>

      {/* Gift Wrap Option */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="giftWrap"
            checked={checkoutState.giftWrap}
            onCheckedChange={(checked) => setCheckoutState((prev:CheckoutState) => ({ ...prev, giftWrap: checked as boolean }))}
          />
          <Label htmlFor="giftWrap" className="flex-1 cursor-pointer">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Gift wrap this order</p>
                <p className="text-sm text-muted-foreground">Beautiful gift wrapping with ribbon</p>
              </div>
              <span className="font-semibold">$4.99</span>
            </div>
          </Label>
        </div>
      </div>
    </div>
  )

  const PaymentStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Payment Information</h2>
        <p className="text-muted-foreground">Choose your payment method</p>
      </div>

      <div>
        <Label className="text-base font-semibold">Payment Method</Label>
        <RadioGroup
          value={checkoutState.selectedPayment}
          onValueChange={(value:string) => setCheckoutState((prev:CheckoutState) => ({ ...prev, selectedPayment: value }))}
          className="mt-3 space-y-3"
        >
          {PAYMENT_METHODS.map((method:{ id: string, type: string, name: string, icon: string }) => (
            <div
              key={method.id}
              className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <RadioGroupItem value={method.id} id={method.id} />
              <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{method.icon}</span>
                  <span className="font-medium">{method.name}</span>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {(checkoutState.selectedPayment === "credit" || checkoutState.selectedPayment === "debit") && (
        <div className="space-y-4 border rounded-lg p-6 bg-muted/50">
          <div>
            <Label htmlFor="cardholderName">Cardholder Name *</Label>
            <Input
              id="cardholderName"
              value={checkoutState.creditCardInfo.cardholderName}
              onChange={(e) => updateCreditCardInfo("cardholderName", e.target.value)}
              className={errors.cardholderName ? "border-red-500" : ""}
              placeholder="John Doe"
            />
            {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
          </div>

          <div>
            <Label htmlFor="cardNumber">Card Number *</Label>
            <Input
              id="cardNumber"
              value={checkoutState.creditCardInfo.cardNumber}
              onChange={(e) => updateCreditCardInfo("cardNumber", e.target.value)}
              className={errors.cardNumber ? "border-red-500" : ""}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date *</Label>
              <Input
                id="expiryDate"
                value={checkoutState.creditCardInfo.expiryDate}
                onChange={(e) => updateCreditCardInfo("expiryDate", e.target.value)}
                className={errors.expiryDate ? "border-red-500" : ""}
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
            </div>

            <div>
              <Label htmlFor="cvv">CVV *</Label>
              <Input
                id="cvv"
                value={checkoutState.creditCardInfo.cvv}
                onChange={(e) => updateCreditCardInfo("cvv", e.target.value)}
                className={errors.cvv ? "border-red-500" : ""}
                placeholder="123"
                maxLength={4}
              />
              {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
          <Textarea
            id="specialInstructions"
            value={checkoutState.specialInstructions}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCheckoutState((prev:CheckoutState) => ({ ...prev, specialInstructions: e.target.value }))}
            placeholder="Any special delivery instructions..."
            rows={3}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="marketingOptIn"
            checked={checkoutState.marketingOptIn}
            onCheckedChange={(checked) => setCheckoutState((prev:CheckoutState) => ({ ...prev, marketingOptIn: checked as boolean }))}
          />
          <Label htmlFor="marketingOptIn" className="text-sm">
            I&apos;d like to receive marketing emails about new products and special offers
          </Label>
        </div>
      </div>
    </div>
  )

  const ReviewStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review Your Order</h2>
        <p className="text-muted-foreground">Please review your order before placing it</p>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{checkoutState.email}</p>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedAddress && (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{selectedAddress.label}</p>
                {selectedAddress.isDefault && <Badge variant="secondary">Default</Badge>}
              </div>
              <p className="font-medium">
                {selectedAddress.firstName} {selectedAddress.lastName}
              </p>
              <p>{selectedAddress.address}</p>
              {selectedAddress.apartment && <p>{selectedAddress.apartment}</p>}
              <p>
                {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}
              </p>
              {selectedAddress.phone && <p>{selectedAddress.phone}</p>}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Shipping Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Shipping Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          {SHIPPING_OPTIONS.find((option) => option.id === checkoutState.selectedShipping) && (
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {SHIPPING_OPTIONS.find((option) => option.id === checkoutState.selectedShipping)?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {SHIPPING_OPTIONS.find((option) => option.id === checkoutState.selectedShipping)?.days}
                </p>
              </div>
              <span className="font-semibold">
                ${SHIPPING_OPTIONS.find((option) => option.id === checkoutState.selectedShipping)?.price}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {PAYMENT_METHODS.find((m) => m.id === checkoutState.selectedPayment)?.icon}
            </span>
            <span className="font-medium">
              {PAYMENT_METHODS.find((m) => m.id === checkoutState.selectedPayment)?.name}
            </span>
            {(checkoutState.selectedPayment === "credit" || checkoutState.selectedPayment === "debit") && (
              <span className="text-muted-foreground">
                ending in {checkoutState.creditCardInfo.cardNumber.slice(-4)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {CART_ITEMS.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative w-16 h-16 shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">{item.brand}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm">Qty: {item.quantity}</span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const ConfirmationStep = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-muted-foreground">Thank you for your purchase. Your order has been placed successfully.</p>
      </div>
      <div className="bg-muted/50 rounded-lg p-6">
        <p className="font-semibold mb-2">Order Number: #ORD-2024-001</p>
        <p className="text-sm text-muted-foreground">
          You&apos;ll receive an email confirmation at {checkoutState.email} shortly with tracking information.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
        <Button>Track Your Order</Button>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <ShippingStep />
      case 1:
        return <PaymentStep />
      case 2:
        return <ReviewStep />
      case 3:
        return <ConfirmationStep />
      default:
        return <ShippingStep />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Checkout</h1>
            {currentStep < 3 && (
              <p className="text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </p>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {currentStep < 3 && (
          <div className="mb-8">
            <Progress value={((currentStep + 1) / steps.length) * 100} className="mb-4" />
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 ${
                    index <= currentStep ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {step.icon}
                  <span className="hidden sm:inline text-sm font-medium">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {renderCurrentStep()}

            {/* Navigation Buttons */}
            {currentStep < 3 && (
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={isLoading}>
                  {isLoading ? (
                    "Processing..."
                  ) : currentStep === steps.length - 1 ? (
                    "Place Order"
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {currentStep < 3 && (
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal ({orderSummary.itemCount} items)</span>
                      <span>${orderSummary.subtotal.toFixed(2)}</span>
                    </div>

                    {orderSummary.savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>You saved</span>
                        <span>-${orderSummary.savings.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${orderSummary.shipping.toFixed(2)}</span>
                    </div>

                    {checkoutState.giftWrap && (
                      <div className="flex justify-between">
                        <span>Gift wrap</span>
                        <span>${orderSummary.giftWrapFee.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${orderSummary.tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${orderSummary.total.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
