import { RELATED_PRODUCTS } from '@/docs/products';
import ProductCardGrid from '../ProductCardGrid';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RelatedProducts() {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Related Products</h2>
        <Link href="/products">
          <Button
            variant="outline"
            className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
          >
            View All Products
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {RELATED_PRODUCTS.map((product) => (
          <ProductCardGrid key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
