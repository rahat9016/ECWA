'use client';

import { Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIES } from '@/docs/categories';
import { CapFirstLetter } from '@/lib/utils';

interface ProductFilterContentProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (value: 'grid' | 'list') => void;
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
  selectedBrands: string[];
  setSelectedBrands: (value: string[]) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  showInStockOnly: boolean;
  setShowInStockOnly: (value: boolean) => void;
  clearAllFilters: () => void;
  handleCategoryChange: (category: string, checked: boolean) => void;
  handleBrandChange: (brand: string, checked: boolean) => void;
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
  selectedSubCategory: string | null;
  setSelectedSubCategory: (value: string | null) => void;
}

const ProductFilterContent = ({
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  selectedCategories,
  selectedBrands,
  priceRange,
  setPriceRange,
  showInStockOnly,
  setShowInStockOnly,
  clearAllFilters,
  handleCategoryChange,
  handleBrandChange,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
}: ProductFilterContentProps) => {
  // Get the selected category object
  const categoryObj = CATEGORIES.find((cat) => cat.name === selectedCategory);

  // Get the selected subcategory object
  const subCategoryObj = categoryObj?.subCategories.find((sub) => sub.name === selectedSubCategory);

  return (
    <aside className="space-y-6 mb-20">
      <div className="flex gap-2 mb-6">
        {/* Sort By */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rating</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
          </SelectContent>
        </Select>

        {/* View Mode */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <Grid3X3 className="w-4 h-4" /> : <List className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={() => {
          clearAllFilters();
          setSelectedCategory(null);
          setSelectedSubCategory(null);
        }}
        className="w-full bg-transparent"
      >
        Clear All Filters
      </Button>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <div key={category.name} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.name}`}
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={(checked) => {
                  handleCategoryChange(category.name, checked as boolean);
                }}
              />
              <Label htmlFor={`category-${category.name}`} className="text-sm font-normal">
                {CapFirstLetter(category.name)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Subcategories (only show if a category is selected) */}
      {selectedCategory && categoryObj && (
        <div>
          <h3 className="font-semibold mb-3">Subcategories</h3>
          <div className="space-y-2">
            {categoryObj.subCategories.map((subCategory) => (
              <div key={subCategory.name} className="flex items-center space-x-2">
                <Checkbox
                  id={`subcategory-${subCategory.name}`}
                  checked={selectedSubCategory === subCategory.name}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedSubCategory(subCategory.name);
                    } else {
                      setSelectedSubCategory(null);
                    }
                  }}
                />
                <Label htmlFor={`subcategory-${subCategory.name}`} className="text-sm font-normal">
                  {subCategory.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Brands (only show if a subcategory is selected) */}
      {selectedSubCategory && subCategoryObj && (
        <div>
          <h3 className="font-semibold mb-3">Brands</h3>
          <div className="space-y-2">
            {subCategoryObj.brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                />
                <Label htmlFor={`brand-${brand}`} className="text-sm font-normal">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={300}
            min={0}
            step={10}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Stock Filter */}
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={showInStockOnly}
            onCheckedChange={(checked) => setShowInStockOnly(checked as boolean)}
          />
          <Label htmlFor="in-stock" className="text-sm font-normal">
            In stock only
          </Label>
        </div>
      </div>
    </aside>
  );
};

export default ProductFilterContent;
