import Image from 'next/image';
import { Star, ShoppingCart, Heart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductType } from '@/types/product';

interface ProductCardGridProps {
  product: ProductType;
  isNew?: boolean;
}

const ProductCardGrid = ({ product }: ProductCardGridProps) => {
  const hasDiscount = product.originalPrice !== undefined && product.originalPrice > product.price;

  const discountPercent =
    hasDiscount && product.originalPrice !== undefined
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <Card className="group overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/20 hover:shadow-xl">
      <CardContent className="flex flex-col h-full p-0">
        {/* Product image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.badge && (
              <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0 shadow-lg">
                {product.badge}
              </Badge>
            )}
          </div>
        </div>

        {/* Product details */}
        <div className="relative flex-grow p-4 pb-16">
          {/* Category */}
          <div className="mb-2">
            <Badge variant="outline" className="text-xs bg-gray-200 text-black border-white">
              {product.category}
            </Badge>
          </div>

          {/* Name */}
          <h3 className="mb-2 font-semibold text-black line-clamp-2">{product.name}</h3>

          {/* Rating */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm text-black">{product.rating}</span>
            </div>
            <span className="text-sm text-black">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="text-lg font-bold text-black">
            <div className="flex items-center gap-2">
              ${product.price}
              {hasDiscount && (
                <>
                  <span className="text-sm font-medium text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <Badge variant="destructive" className="bg-red-500 text-white shadow-lg">
                    -{discountPercent}%
                  </Badge>
                </>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col">
            <div className="flex justify-between items-center gap-2">
              <div className="w-full flex items-center">
                <Button className="w-full px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 shadow-lg">
                  <ShoppingCart className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              <div className="w-10">
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-10 h-10 p-0 bg-white/90 backdrop-blur-sm border-0 hover:bg-white shadow-lg"
                >
                  <Heart className="w-4 h-4 text-gray-600" />
                </Button>
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="w-10 h-10 p-0 bg-white/90 backdrop-blur-sm border-0 hover:bg-white shadow-lg"
                // onClick={() => handleRemoveItem(item.id)}
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCardGrid;
