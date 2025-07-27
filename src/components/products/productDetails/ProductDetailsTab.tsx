import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PRODUCT, TABSTITLES } from '@/docs/products';
import Image from 'next/image';
import {
  Star,
  Truck,
  RotateCcw,
  Check,
  MessageCircle,
  ThumbsUp,
  Zap,
  Package,
  CreditCard,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { REVIEWS } from '@/docs/reviews';
import { ReviewType } from '@/types/review';

interface RatingDistribution {
  stars: number;
  count: number;
  percentage: number;
}

interface ProductDetailsTabProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  reviewFilter: string;
  setReviewFilter: (value: string) => void;
  showAllReviews: boolean;
  setShowAllReviews: (value: boolean) => void;
  ratingDistribution: RatingDistribution[];
}

export function ProductDetailsTab(props: ProductDetailsTabProps) {
  return (
    <div className="bg-white shadow-sm border border-gray-200 overflow-hidden mb-12">
      <Tabs value={props.activeTab} onValueChange={props.setActiveTab} className="w-full">
        <TabsList className="w-full flex-col lg:flex-row px-3 py-2">
          {TABSTITLES.map(({ value, label }: { value: string; label: string }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="py-2 px-6 font-semibold hover:bg-bgGray data-[state=active]:bg-white border-b-2 border-b-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="description" className="p-6 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{PRODUCT.description}</p>

            <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRODUCT.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="specifications" className="p-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(PRODUCT.specifications).map(([key, value]: [string, string]) => (
                <div
                  key={key}
                  className="flex justify-between items-center py-3 border-b border-gray-200"
                >
                  <span className="font-semibold text-gray-900">{key}</span>
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="p-6 space-y-6">
          {/* Review Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{PRODUCT.rating}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(PRODUCT.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">{PRODUCT.reviewCount} reviews</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Rating Distribution</h4>
              <div className="space-y-3">
                {props.ratingDistribution.map((rating: RatingDistribution) => (
                  <div key={rating.stars} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 w-8">{rating.stars}★</span>
                    <Progress value={rating.percentage} className="flex-1 h-2" />
                    <span className="text-sm text-gray-600 w-12">{rating.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Review Filters */}
          <div className="flex items-center gap-4">
            <Select value={props.reviewFilter} onValueChange={props.setReviewFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter reviews" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reviews</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
                <SelectItem value="verified">Verified Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {REVIEWS.slice(0, props.showAllReviews ? REVIEWS.length : 3).map((review:ReviewType) => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Image
                  src={review.avatar || '/placeholder.svg'}
                  alt={review.user as string}
                  width={48}
                  height={48}
                  className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">{review.user}</span>
                      {review.verified && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <Check className="w-3 h-3 mr-1" />
                          Verified Purchase
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{review.date}</span>
                    </div>

                    <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                    <p className="text-gray-700 mb-4">{review.content}</p>

                    {review.images.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {review.images.map((image: string, index: number) => (
                          <Image
                            key={index}
                            src={image || '/placeholder.svg'}
                            alt={`Review image ${index + 1}`}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">Helpful ({review.helpful})</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {REVIEWS.length > 3 && (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => props.setShowAllReviews(!props.showAllReviews)}
                className="px-8"
              >
                {props.showAllReviews ? 'Show Less' : `Show All ${REVIEWS.length} Reviews`}
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="shipping" className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Shipping Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold">Free Standard Shipping</p>
                    <p className="text-sm text-gray-600">{PRODUCT.shipping.estimatedDays}</p>
                  </div>
                </div>
                {PRODUCT.shipping.express.available && (
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-semibold">
                        Express Shipping - ${PRODUCT.shipping.express.price}
                      </p>
                      <p className="text-sm text-gray-600">{PRODUCT.shipping.express.days}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold">Worldwide Shipping</p>
                    <p className="text-sm text-gray-600">Available to most countries</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Return Policy</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold">30-Day Returns</p>
                    <p className="text-sm text-gray-600">Hassle-free returns within 30 days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold">Original Packaging</p>
                    <p className="text-sm text-gray-600">Items must be in original condition</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-semibold">Full Refund</p>
                    <p className="text-sm text-gray-600">Money back guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
