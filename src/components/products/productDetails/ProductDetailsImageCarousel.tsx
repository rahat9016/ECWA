'use client';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PRODUCT } from '@/docs/products';
import { Dispatch, SetStateAction } from 'react';

interface ProductDetailsImageCarouselProps {
  selectedImageIndex: string;
  _selectedImageIndex: number;
  setSelectedImageIndex: Dispatch<SetStateAction<number>>;
  discount: number;
  nextImage: () => void;
  prevImage: () => void;
}

export function ProductDetailsImageCarousel(props: ProductDetailsImageCarouselProps) {
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <Image
          src={props.selectedImageIndex || '/placeholder.svg'}
          alt={PRODUCT.name}
          fill
          className="object-cover"
          priority
        />

        {/* Navigation Arrows */}
        <button
          onClick={props.prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={props.nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Discount Badge */}
        {props.discount > 0 && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-red-500 text-white text-sm px-3 py-1 shadow-lg">
              -{props.discount}% OFF
            </Badge>
          </div>
        )}

        {/* Stock Status */}
        <div className="absolute top-4 right-4">
          <Badge
            className={`${PRODUCT.inStock ? 'bg-green-500' : 'bg-red-500'} text-white shadow-lg`}
          >
            {PRODUCT.inStock ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {PRODUCT.images.map((image: string, index: number) => (
          <button
            key={index}
            onClick={() => props.setSelectedImageIndex(index)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${props._selectedImageIndex === index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <Image
              src={image || '/placeholder.svg'}
              alt={`${PRODUCT.name} view ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
