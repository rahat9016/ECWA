'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { PRODUCTS } from '@/docs/products';
import ProductCardList from '../ProductCardList';
import ProductCardGrid from '../ProductCardGrid';
import { useRouter, useSearchParams } from 'next/navigation';
import { RxCross2 } from 'react-icons/rx';
import ProductFilterContent from './ProductFilterContent';
import FilterSidebar from './FilterSidebar';
import NotFound from '../NotFound';

// Wrap the component that uses useSearchParams with Suspense
function ProductsContent() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(searchTerm || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortBy, setSortBy] = useState('featured');
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  useEffect(() => {
    setSearchQuery(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFilterOpen]);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesStock = !showInStockOnly || product.inStock;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          return b.featured ? 1 : -1;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategories, selectedBrands, priceRange, sortBy, showInStockOnly]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
      setSelectedCategory(category);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 300]);
    setShowInStockOnly(false);
    setSortBy('featured');
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  };

  const ProductCards = ({ product }: { product: (typeof PRODUCTS)[0] }) => {
    const discount = Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100,
    );
    if (viewMode === 'list') {
      return <ProductCardList discount={discount} product={product} />;
    }
    return <ProductCardGrid discount={discount} product={product} textColor="#2b2b2b" />;
  };

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 flex flex-col bg-white">
        {/* Header */}
        <div className="my-8">
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <p className="text-muted-foreground">Discover our amazing collection of products</p>
        </div>
        <div>
          {searchQuery && (
            <div className="mb-4 inline-block bg-blue-100 border rounded-full px-3">
              <div className="text-blue-800 text-sm flex items-center">
                Showing results for &quot;<span className="font-semibold">{searchTerm}</span>&quot;
                <button
                  onClick={() => {
                    setSearchQuery('');
                    router.push('/products');
                  }}
                  className="ml-2 hover:bg-blue-200 rounded-full p-0.5 text-blue-600 hover:text-blue-800"
                >
                  <RxCross2 />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex gap-6 mb-10">
          {/* Filters (Desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilterContent
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewMode={viewMode}
              setViewMode={setViewMode}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              showInStockOnly={showInStockOnly}
              setShowInStockOnly={setShowInStockOnly}
              clearAllFilters={clearAllFilters}
              handleCategoryChange={handleCategoryChange}
              handleBrandChange={handleBrandChange}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
            />
          </aside>

          {/* Products */}
          <main className="flex-1">
            {filteredAndSortedProducts.length === 0 ? (
              <NotFound />
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCards key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCards key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <FilterSidebar
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showInStockOnly={showInStockOnly}
        setShowInStockOnly={setShowInStockOnly}
        viewMode={viewMode}
        setViewMode={setViewMode}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        handleCategoryChange={handleCategoryChange}
        handleBrandChange={handleBrandChange}
        clearAllFilters={clearAllFilters}
      />
    </div>
  );
}

// Main component with Suspense boundary
export default function Products() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading products...</span>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}