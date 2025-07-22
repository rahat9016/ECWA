import { Button } from '../ui/button';

const StayUpdate = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#56cfe1]/25 via-[#48cae4]/20 to-[#90e0ef]/30">
      <div className="container mx-auto px-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-[#48cae4]/30 p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Stay Updated</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter and be the first to know about new products, exclusive
            offers, and special discounts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 text-white font-semibold px-8 shadow-lg">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayUpdate;
