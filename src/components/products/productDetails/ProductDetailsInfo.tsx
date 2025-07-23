
import { Button } from '@/components/ui/button';
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Plus,
  Minus,
  Check,
  X,

} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { PRODUCT } from '@/docs/products';


interface ProductColor {
  name: string;
  value: string;
  available: boolean;
}
interface ProductDetailsInfoProps {
  selectedColor: ProductColor;
  setSelectedColor: (color: ProductColor) => void;
  quantity: number;
  isWishlisted: boolean;
  setIsWishlisted: (wishlisted: boolean) => void;
  discount: number;
  savings: number;
  updateQuantity: (newQuantity: number) => void;
}

export function ProductDetailsInfo(props: ProductDetailsInfoProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          {/* Stock Info */}
          {PRODUCT.inStock && (
            <Badge variant="outline" className="flex items-center gap-2 bg-green">
              <Check className="w-5 h-5" />
              <span className="font-medium">
                {PRODUCT.stockCount > 10 ? 'In Stock' : `Only ${PRODUCT.stockCount} left in stock`}
              </span>
            </Badge>
          )}
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            {PRODUCT.brand}
          </Badge>
          <Badge variant="outline" className="text-gray-600">
            SKU: {PRODUCT.sku}
          </Badge>
        </div>
        {/* Price */}
        <div className="my-3 flex flex-col gap-1 items-start">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-gray-900">৳{PRODUCT.price}</div>
            {PRODUCT.originalPrice > PRODUCT.price && (
              <div className="text-xl text-gray-500 line-through">৳{PRODUCT.originalPrice}</div>
            )}
          </div>
          {props.savings > 0 && (
            <div className="flex items-center gap-2">
              <Badge className="bg-[#FD384F] text-white">Save ৳{props.savings.toFixed(2)}</Badge>
              <div className="text-[#d3031c] font-medium">{props.discount}% off</div>
            </div>
          )}
        </div>

        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">{PRODUCT.name}</h1>

        {/* Rating */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(PRODUCT.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-lg font-semibold text-gray-900 ml-2">{PRODUCT.rating}</span>
            </div>
            <span className="text-gray-600">({PRODUCT.reviewCount.toLocaleString()} reviews)</span>
          </div>
          <button className="text-blue-600 text-start hover:text-blue-700 font-medium">
            See all reviews
          </button>
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <Label className="text-black font-semibold mb-3 block">
          Color: {props.selectedColor.name}
        </Label>
        <div className="flex gap-3">
          {PRODUCT.colors.map((color: ProductColor) => (
            <button
              key={color.name}
              onClick={() => color.available && props.setSelectedColor(color)}
              disabled={!color.available}
              className={`relative w-8 h-8 rounded-full border-2 transition-all ${props.selectedColor.name === color.name ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300 hover:border-gray-400'} ${!color.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              style={{
                backgroundColor: color.value,
              }}
            >
              {props.selectedColor.name === color.name && (
                <Check className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )}
              {!color.available && (
                <X className="w-4 h-4 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <Label className="text-black font-semibold mb-3 block">Quantity</Label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => props.updateQuantity(props.quantity - 1)}
              disabled={props.quantity <= 1}
              className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 font-semibold min-w-[60px] text-center">
              {props.quantity}
            </span>
            <button
              onClick={() => props.updateQuantity(props.quantity + 1)}
              disabled={props.quantity >= 10}
              className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-gray-600">Max 10 per order</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button
            size="lg"
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 text-lg shadow-lg"
            disabled={!PRODUCT.inStock}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => props.setIsWishlisted(!props.isWishlisted)}
            className={`px-4 py-4 ${props.isWishlisted ? 'text-red-500 border-red-200 bg-red-50' : ''}`}
          >
            <Heart className={`w-5 h-5 ${props.isWishlisted ? 'fill-red-500' : ''}`} />
          </Button>
          <Button size="lg" variant="outline" className="px-4 py-4 bg-transparent">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        <Button
          size="lg"
          variant="outline"
          className="w-full py-4 text-lg font-semibold border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors bg-transparent"
          disabled={!PRODUCT.inStock}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
}