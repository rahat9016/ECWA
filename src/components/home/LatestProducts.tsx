import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NEW_PRODUCTS } from '@/docs/homeDocs';
import ProductCard from '../products/ProductCardGrid';

const LatestProducts = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1c7293] via-[#1c7293]/80 to-[#1c7293]/60">
      <div className="container mx-auto px-4 flex flex-col">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-white/20 to-white/30 text-white border-0 mb-4 shadow-lg backdrop-blur-sm">
            New Arrivals
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Latest Products</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Be the first to discover our newest additions and stay ahead of the trends
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {NEW_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} isNew />
          ))}
        </div>

        <div className="text-center">
          <Link href="/products">
            <Button
              size="lg"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 text-white font-semibold px-8 py-4 text-lg shadow-xl"
            >
              Explore New Arrivals
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
