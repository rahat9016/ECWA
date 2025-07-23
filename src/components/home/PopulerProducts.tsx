import { FEATURED_PRODUCTS } from '@/docs/homeDocs';
import React from 'react';
import ProductCard from '../products/ProductCardGrid';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PopulerProducts = () => {
  return (
    <section className="py-20 bg-[#40916c]">
      <div className="container mx-auto px-4 flex flex-col">
        <div className="text-center mb-16">
          <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 mb-4 shadow-lg">
            Featured Products
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Best Sellers</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Discover our most popular products loved by thousands of customers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/products">
            <Button
              size="lg"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 text-white font-semibold px-8 py-4 text-lg shadow-xl"
            >
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopulerProducts;
