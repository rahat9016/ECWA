export interface CartItem {
  id: number
  name: string
  brand: string
  price: number
  originalPrice: number
  image: string
  quantity: number
  inStock: boolean
  category: string
}

export interface SavedAddress {
  id: string
  label: string
  firstName: string
  lastName: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
  phone?: string
}

export interface PaymentMethod {
  id: string
  type: "credit" | "debit" | "paypal" | "apple_pay" | "google_pay"
  name: string
  icon: string
}

export interface CreditCardInfo {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
}

export interface ShippingOption {
  id: string
  name: string
  price: number
  days: string
  description?: string
}

export interface OrderSummary {
  subtotal: number
  savings: number
  couponDiscount: number
  shipping: number
  giftWrapFee: number
  tax: number
  total: number
  itemCount: number
}

export interface CheckoutState {
  currentStep: number
  selectedAddressId: string
  selectedShipping: string
  selectedPayment: string
  creditCardInfo: CreditCardInfo
  giftWrap: boolean
  specialInstructions: string
  marketingOptIn: boolean
  email: string
}

export interface FormErrors {
  [key: string]: string
}

export type CheckoutStep = "shipping" | "payment" | "review" | "confirmation"

export interface NewAddressForm {
  label: string
  firstName: string
  lastName: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
  isDefault: boolean
}

export interface AddressFormErrors {
  [key: string]: string
}
