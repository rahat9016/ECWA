import {
  ShoppingCart,
  Eye,
  Truck,
  Shield,
  Headphones,
  RotateCcw,
  CheckCircle,
  Users,
  Award,
  Zap,
} from 'lucide-react';

export const FEATURES = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: 'Free Shipping',
    description: 'Free shipping on orders over $50',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Secure Payment',
    description: '100% secure payment processing',
  },
  {
    icon: <RotateCcw className="w-6 h-6" />,
    title: 'Easy Returns',
    description: '30-day hassle-free returns',
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: '24/7 Support',
    description: 'Round-the-clock customer support',
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Browse & Discover',
    description: 'Explore our curated collection of premium products across multiple categories',
    icon: <Eye className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
  },
  {
    step: 2,
    title: 'Add to Cart',
    description: 'Select your favorite items and add them to your shopping cart with one click',
    icon: <ShoppingCart className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
  },
  {
    step: 3,
    title: 'Secure Checkout',
    description: 'Complete your purchase with our secure and fast checkout process',
    icon: <Shield className="w-8 h-8" />,
    color: 'from-green-500 to-green-600',
  },
  {
    step: 4,
    title: 'Fast Delivery',
    description: 'Receive your order quickly with our reliable shipping partners',
    icon: <Truck className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600',
  },
];

export const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 1247,
    image: '/placeholder.svg?height=400&width=400',
    badge: 'Best Seller',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Designer Leather Handbag',
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviews: 892,
    image: '/placeholder.svg?height=400&width=400',
    badge: 'Limited Edition',
    category: 'Fashion',
  },
  {
    id: 3,
    name: 'Smart Fitness Watch',
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.7,
    reviews: 2156,
    image: '/placeholder.svg?height=400&width=400',
    badge: 'New',
    category: 'Electronics',
  },
  {
    id: 4,
    name: 'Organic Cotton T-Shirt',
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.6,
    reviews: 634,
    image: '/placeholder.svg?height=400&width=400',
    badge: 'Eco-Friendly',
    category: 'Fashion',
  },
];

export const NEW_PRODUCTS = [
  {
    id: 5,
    name: 'Minimalist Desk Lamp',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviews: 234,
    image: '/placeholder.svg?height=400&width=400',
    category: 'Home & Living',
  },
  {
    id: 6,
    name: 'Wireless Charging Pad',
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.4,
    reviews: 567,
    image: '/placeholder.svg?height=400&width=400',
    category: 'Electronics',
  },
  {
    id: 7,
    name: 'Ceramic Coffee Mug Set',
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.8,
    reviews: 423,
    image: '/placeholder.svg?height=400&width=400',
    category: 'Home & Living',
  },
  {
    id: 8,
    name: 'Bluetooth Speaker',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.6,
    reviews: 789,
    image: '/placeholder.svg?height=400&width=400',
    category: 'Electronics',
  },
];

export const STATS = [
  { number: '50K+', label: 'Happy Customers', icon: <Users className="w-6 h-6" /> },
  { number: '10K+', label: 'Products Sold', icon: <Award className="w-6 h-6" /> },
  { number: '99%', label: 'Satisfaction Rate', icon: <CheckCircle className="w-6 h-6" /> },
  { number: '24/7', label: 'Support Available', icon: <Zap className="w-6 h-6" /> },
];
