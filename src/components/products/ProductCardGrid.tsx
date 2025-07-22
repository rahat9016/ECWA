import Image from 'next/image';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ProductType } from '@/types/product';

function ProductCardGrid({ discount, product }: { discount?: number; product:ProductType }) {
  return (
    <Card className="group overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
          {product.featured && <Badge className="absolute top-2 left-2">Featured</Badge>}
          {discount && discount > 0 && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              -{discount}%
            </Badge>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">${product.price}</span>
              {product.originalPrice &&product.originalPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <Button size="sm" disabled={!product.inStock}>
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCardGrid;
