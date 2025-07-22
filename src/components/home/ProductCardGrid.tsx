import Image from 'next/image';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductType } from '@/types/product';

const ProductCardGrid = ({
  product,
  isNew = false,  
}: {
  product: ProductType;
  isNew?: boolean;
  discount?: number;
  textColor?: string;
}) => {
  return (
    <Card className="group overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="flex flex-col justify-between p-0 h-full">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Badges */}
          <div className="absolute top-3 left-3">
            {product.badge && (
              <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0 shadow-lg">
                {product.badge}
              </Badge>
            )}
            {isNew && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 ml-2 shadow-lg">
                New
              </Badge>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              className="w-10 h-10 p-0 bg-white/90 backdrop-blur-sm border-0 hover:bg-white shadow-lg"
            >
              <Heart className="w-4 h-4 text-gray-600" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="w-10 h-10 p-0 bg-white/90 backdrop-blur-sm border-0 hover:bg-white shadow-lg"
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </Button>
          </div>

          {/* Discount percentage */}
          {product.originalPrice !== undefined && product.originalPrice > product.price && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="destructive" className="bg-red-500 text-white shadow-lg">
                -
                {Math.round(
                  ((product.originalPrice - product.price) / product.originalPrice) * 100,
                )}
                %
              </Badge>
            </div>
          )}
        </div>

        <div className={`relative pb-16 p-4 flex-grow`}>
          <div className="mb-2">
            <Badge variant="outline" className="text-xs border-white text-black bg-gray-200">
              {product.category}
            </Badge>
          </div>

          <h3 className="font-semibold text-black mb-2 line-clamp-2 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-black ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-black">({product.reviews} reviews)</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex  justify-between items-center w-full text-lg font-bold text-black">
                <div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="text-sm font-medium text-gray-500 line-through">
                      ${product.originalPrice}
                    </div>
                  )}
                  ${product.price}
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 shadow-lg">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCardGrid;
