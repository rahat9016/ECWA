export interface RecentActivityItem {
  id: string
  type: "order" | "wishlist" | "coupon" | "delivery"
  description: string
  date: string
  status?: string
}