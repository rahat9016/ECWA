import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HOW_IT_WORKS } from '@/docs/homeDocs';

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#90e0ef]/30 via-[#56cfe1]/20 to-[#48cae4]/30">
      <div className="container mx-auto px-4 flex flex-col">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 mb-4 shadow-lg">
            How It Works
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple Steps to Shop
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience seamless shopping with our user-friendly process designed for your
            convenience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOW_IT_WORKS.map((step, index) => (
            <Card
              key={index}
              className="bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`bg-gradient-to-r ${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg`}
                >
                  {step.icon}
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-sm shadow-lg">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
